import React,{useState} from "react";

const {kakao} = window;

const MainListItem = ({item, map, marker}) => {
    const [isHover, setIsHover] = useState(false);
    const position = new kakao.maps.LatLng(item.lon, item.lat);

    // 지도의 위치 이동 및 마커 설정
    const handleOnMouseEnter = ()=> {
        setIsHover(true);
        map.panTo(position);
        marker.setPosition(position);
        marker.setMap(map);
    }

    const handleOnMouseLeave = ()=> {
        setIsHover(false);
        marker.setMap(null);
    }

    return (
<<<<<<< HEAD
        <div className="MainListItem">
            <h2>list element</h2>
=======
        <div className="MainListItem"
             onMouseLeave={handleOnMouseLeave}
             onMouseEnter={handleOnMouseEnter}
             style={isHover ?{background : "lightgray"} : {}}
        >
>>>>>>> 3550c8bfb0ba033c3a726873e407ea20be8ad323
            <div className="info">
                <span>식당 이름 : {item.name}</span><br/>
                <span>역에서 식당까지 거리 : {item.distance}km</span><br/>
                <span>동 : {item.dong}</span><br/>
                <span>cate1 : {item.cate1}</span><br/>
                <span>cate2 : {item.cate2}</span><br/>
                <span>cate3 : {item.cate3}</span><br/>
                <span>cate4 : {item.cate4}</span><br/>
            </div>
        </div>
    );
}

export default React.memo(MainListItem);