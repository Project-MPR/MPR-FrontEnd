import './App.css';
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import {useReducer} from "react";
import {stationReducer} from "./state";

const {kakao} = window;

function App() {
    const [station, stationDispatch] = useReducer(stationReducer,
        {
            name: "광운대역",
            lon: 37.623662704,
            lat: 127.061441277,
            position: new kakao.maps.LatLng(37.623662704, 127.061441277),
        });

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/home" element={<Home station={station} stationDispatch={stationDispatch}/>}/>
                    <Route path="/" element={<Search stationDispatch={stationDispatch}/>}/>
                    <Route path="/search" element={<Search stationDispatch={stationDispatch}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;