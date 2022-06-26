import './App.css';
import KakaoMap from "./KakaoMap";
import Navbar from "./Navbar";
import MainList from "./MainList";

const dummyList = [
    {
        r_name: "AAA",
        station_to_r_time: 10,

    },
]


function App() {
    return (
        <div className="App">
            <Navbar/>
            <div className="MainContent">
                <MainList/>
                <KakaoMap/>
            </div>
        </div>
    );
}

export default App;
