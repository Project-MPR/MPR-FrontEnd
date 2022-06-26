import './App.css';
import KakaoMap from "./KakaoMap";
import Navbar from "./Navbar";
import MainList from "./MainList";

const dummyList = [
    {
        id : 0,
        r_name: "AAA",
        station_to_r_time: 10,
    },
    {
        id : 1,
        r_name: "BBB",
        station_to_r_time: 20,
    },
    {
        id : 2,
        r_name: "CCC",
        station_to_r_time: 30,
    },
    {
        id : 3,
        r_name: "DDD",
        station_to_r_time: 40,
    },
    {
        id : 4,
        r_name: "EEE",
        station_to_r_time: 50,
    },
    {
        id : 5,
        r_name: "AAA",
        station_to_r_time: 10,
    },
    {
        id : 6,
        r_name: "BBB",
        station_to_r_time: 20,
    },
    {
        id : 7,
        r_name: "CCC",
        station_to_r_time: 30,
    },
    {
        id : 8,
        r_name: "DDD",
        station_to_r_time: 40,
    },
    {
        id : 9,
        r_name: "EEE",
        station_to_r_time: 50,
    },
]

// https://jsonplaceholder.typicode.com/comments

function App() {
    return (
        <div className="App">
            <Navbar/>
            <div className="MainContent">
                <MainList listContent={dummyList}/>
                <KakaoMap/>
            </div>
        </div>
    );
}

export default App;
