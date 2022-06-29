import './App.css';
import KakaoMap from "./KakaoMap";
import Navbar from "./Navbar";
import MainList from "./MainList";
import {useEffect, useState} from "react";

// http://localhost:8080/api/restaurant/역삼

const {kakao} = window;

function App() {
    const [data, setData] = useState([]);
    const [station, setStation] = useState(
        {
            name: "광운대역",
            lon: 37.623662704,
            lat: 127.061441277,
            position: new kakao.maps.LatLng(37.623662704, 127.061441277),
        });
    // kakao map api를 위한 객체들
    const stationPosition = new kakao.maps.LatLng(station.lon, station.lat);
    const [map, setMap] = useState({});
    const [marker, setMarker] = useState({});
    const [stationToRestaurantPolyline, setStationToRestaurantPolyline] = useState(
        new kakao.maps.Polyline({
            strokeWeight: 6, // 선의 두께 입니다
            strokeColor: '#39DE2A', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'shortdashdot' // 선의 스타일입니다
        }));

    const [customOverlay, setCustomOverlay] = useState(new kakao.maps.CustomOverlay({
        yAnchor: 1
    }));

    // rest api로 역 이름을 통해 음식점 정보를 가져오는 함수
    const getDate = async (station) => {
        await fetch(`http://localhost:8080/api/restaurant/${station}`)
            .then(res => res.json())
            .then(res => res.sort((a, b) => a.distance - b.distance))
            .then(res => setData(res));
    }

    // station이 변경될때 마다 정보를 다시 불러오는 useEffect
    useEffect(() => {
        getDate(station.name);
    }, [station.name]);

    // 컴포넌트가 업데이트 될 때마다 다시 불러오는 useEffect
    useEffect(() => {
        const container = document.getElementById("myMap");
        const options = {
            center: stationPosition,
            level: 3
        };

        setMap(new kakao.maps.Map(container, options));
        setMarker(new kakao.maps.Marker());
    }, []);

    return (
        <div className="App">
            <Navbar/>
            <div className="MainContent">
                <MainList
                    listContent={data}
                    map={map}
                    marker={marker}
                    station={station}
                    stationToRestaurantPolyline={stationToRestaurantPolyline}
                    customOverlay={customOverlay}
                />
                <KakaoMap map={map} station={station}/>
            </div>
        </div>
    );
}

export default App;
