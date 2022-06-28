<<<<<<< HEAD
import React, {useEffect} from 'react';

const {kakao} = window;
const KakaoMap = () => {

    useEffect(() => {
        const container = document.getElementById("myMap");
        const options = {
            center: new kakao.maps.LatLng(37.554648, 126.972559),
            level: 3
        };
        const map = new kakao.maps.Map(container, options);
    }, []);
=======
import React from 'react';
>>>>>>> 3550c8bfb0ba033c3a726873e407ea20be8ad323

const KakaoMap = ({map}) => {
    return (
        <div id='myMap' style={{height:"95vh", width : "80vw"}}></div>
    );
}

export default KakaoMap;

