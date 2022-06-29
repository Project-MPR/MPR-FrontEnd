import React,{useState} from "react";

const {kakao} = window;

const MainListItem = ({item, map, marker}) => {
    const [isHover, setIsHover] = useState(false);
    const position = new kakao.maps.LatLng(item.lon, item.lat);

    // hover 기능 on
    const handleOnMouseEnter = ()=> {
        setIsHover(true);
        map.panTo(position);
        marker.setPosition(position);
        marker.setMap(map);
    }

    // hover 기능 off
    const handleOnMouseLeave = ()=> {
        setIsHover(false);
        marker.setMap(null);
    }

    return (
        <div className="MainListItem"
             onMouseLeave={handleOnMouseLeave}
             onMouseEnter={handleOnMouseEnter}
             style={isHover ?{background : "lightgray"} : {}}
        >
            <div className="info">
                <span>식당 이름 : {item.name}</span><br/>
                <span>역에서 식당까지 거리 : {item.distance}km</span><br/>
                <span>동 : {item.dong}</span><br/>
                <span>cate1 : {item.cate1}</span><br/>
                <span>cate2 : {item.cate2}</span><br/>
                <span>cate3 : {item.cate3}</span><br/>

                <span>lon : {item.lon}</span><br/>
                <span>lat : {item.lat}</span><br/>
            </div>
        </div>
    );
}

export default React.memo(MainListItem);