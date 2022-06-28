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
    const [station, setStation] = useState("광운대역");

    const getDate = async (station) => {
        const res = await fetch(`http://localhost:8080/api/restaurant/${station}`)
            .then(res => res.json())
        // 정렬
        res.sort((a, b) => a.distance - b.distance);// 거리 순으로 오름차순 정렬
        setData(res);
    }

    useEffect(()=>{
        getDate(station);
    }, [station]);

    useEffect(() => {
        const container = document.getElementById("myMap");
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
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
                <KakaoMap map={map}/>
            </div>
        </div>
    );
}

export default App;
