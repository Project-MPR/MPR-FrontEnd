import Navbar from "../components/Navbar";
import KakaoMap from "../components/KakaoMap";
import MainList from "../components/MainList";
import {createContext, useEffect, useReducer} from "react";
import {dataReducer, mapReducer, markerReducer, overlayReducer, polyLineReducer} from "../state";
import {apiData} from "../api/server";


const {kakao} = window;

export const MainListDataStateContext = createContext();
export const MainListStationStateContext = createContext();
export const DispatcherContext = createContext();

const Home = ({station, stationDispatch}) => {
    //const {stationDispatch} = useContext(DispatcherContext);
    const [data, dataDispatch] = useReducer(dataReducer, []);

    const [map, mapDispatch] = useReducer(mapReducer, {})
    const [marker, markerDispatch] = useReducer(markerReducer, new kakao.maps.Marker());
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
        apiData(station).then(res => dataDispatch({type: 'INIT', data: res}));
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
    }, [station.position])

    const states = {map, station, marker, polyline, overlay}// 전역적인 사용을 위해서 하나의 객체로 감싸자
    const dispatches = {mapDispatch, markerDispatch, dataDispatch, overlayDispatch, polyLineDispatch, stationDispatch}


    return (
        <MainListDataStateContext.Provider value={data}>
            <MainListStationStateContext.Provider value={states}>
                <DispatcherContext.Provider value={dispatches}>
                    <div className="Home">
                        <Navbar stationDispatch={stationDispatch}/>
                        <div className="MainContent">
                            <MainList/>
                            <KakaoMap/>
                        </div>
                    </div>
                </DispatcherContext.Provider>
            </MainListStationStateContext.Provider>
        </MainListDataStateContext.Provider>
    );
}

export default Home;