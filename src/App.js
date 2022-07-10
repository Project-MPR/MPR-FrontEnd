import './App.css';
import KakaoMap from "./KakaoMap";
import Navbar from "./Navbar";
import MainList from "./MainList";
import {createContext, useEffect, useReducer} from "react";
import {dataReducer, mapReducer, markerReducer, overlayReducer, polyLineReducer, stationReducer} from "./state";

const {kakao} = window;

export const MainListDataStateContext = createContext();
export const MainListStationStateContext = createContext();

function App() {
    const [data, dataDispatch] = useReducer(dataReducer, []);
    const [station, stationDispatch] = useReducer(stationReducer,
        {
            name: "광운대역",
            lon: 37.623662704,
            lat: 127.061441277,
            position: new kakao.maps.LatLng(37.623662704, 127.061441277),
        });
    const [map, mapDispatch] = useReducer(mapReducer, {})
    const [marker, markerDispatcher] = useReducer(markerReducer, new kakao.maps.Marker());
    const [polyline, polyLineDispatch] = useReducer(polyLineReducer,
        new kakao.maps.Polyline({
            strokeWeight: 6, // 선의 두께 입니다
            strokeColor: '#39DE2A', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'shortdashdot' // 선의 스타일입니다
        }));
    const [overlay, overlayDispatch] = useReducer(overlayReducer, new kakao.maps.CustomOverlay({yAnchor: 1}));

    // rest api로 역 이름을 통해 음식점 정보를 가져오는 함수
    const getDate = async (station) => {
        await fetch(`http://localhost:8080/api/restaurant/${station}`)
            .then(res => res.json())
            .then(res => res.sort((a, b) => a.distance - b.distance))
            .then(res => dataDispatch({type: 'INIT', data: res}));
    }

    // station이 변경될때 마다 정보를 다시 불러오는 useEffect
    useEffect(() => {
        getDate(station.name);
    }, [station.name]);

    // mount 될때 마다 새로 map 객체를 생성하자(그렇지 않으면 오류가 발생)
    useEffect(() => {
        const container = document.getElementById("myMap");

        const option = {
            center: station.position,
            level: 3,
        };
        mapDispatch({type: "INIT", data: new kakao.maps.Map(container, option)});
    }, [])

    const states = {map, station, marker, polyline, overlay}// 전역적인 사용을 위해서 하나의 객체로 감싸자


    // 검색어 자동완성
    const stations = fetch("http://localhost:8080/api/stations");
    const [search, setSearch] = useState("");
    const [results, setResult] = useState([]);
    
    const updateField = (field, value, update = true) => {
        if(update) onSearch(value);
        if(field === 'keyword'){
            setSearch(value);
        }
        if(field === 'results'){
            setResult(value);
        }
    }

    const onSearch = text => {
        var results = stations.filter(item => true === matchName(item.name, text));
        setResult({results});
    }

    const matchName = (name, search) => {
        var searchLen = search.length;
        name = name.toLowerCase().substring(0, searchLen);
        if(search === "") return false;
        return name === search.toString().toLowerCase();
    }



    return (
        <MainListDataStateContext.Provider value={data}>
            <MainListStationStateContext.Provider value={states}>
                <div className="App">
                    <Navbar stationDispatch={stationDispatch}/>
                    <div className="MainContent">
                        <MainList/>
                        <KakaoMap/>
                    </div>
                </div>
            </MainListStationStateContext.Provider>
        </MainListDataStateContext.Provider>
    );
}

export default App;
