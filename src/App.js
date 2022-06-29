import './App.css';
import KakaoMap from "./KakaoMap";
import Navbar from "./Navbar";
import MainList from "./MainList";
import {useEffect, useState} from "react";

// http://localhost:8080/api/restaurant/역삼

const {kakao} = window;

function App() {
    const [data, setData] = useState([]);
    const [map, setMap] = useState({});
    const [marker, setMarker] = useState({});
    const [station, setStation] = useState(
        {
            name: "광운대역",
            lon: 37.623662704,
            lat: 127.061441277
        });
    const stationPosition = new kakao.maps.LatLng(station.lon, station.lat);

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
                <MainList listContent={data} map={map} marker={marker}/>
                <KakaoMap map={map} station={station}/>
            </div>
        </div>
    );
}

export default App;
