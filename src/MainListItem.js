import React, {useState} from "react";

const {kakao} = window;

const MainListItem = (
    {
        item,
        map,
        marker,
        station,
        stationToRestaurantPolyline,
        customOverlay,
    }) => {
    const [isHover, setIsHover] = useState(false);
    const position = new kakao.maps.LatLng(item.lon, item.lat);

    // hover 기능 on
    const handleOnMouseEnter = () => {
        setIsHover(true);
        map.panTo(position);
        marker.setPosition(position);
        marker.setMap(map);

        createLinePath();

        const content =
            '<div class="overlaybox">' +
                `<div class="overlayInfo">` +
                    `<div>${item.name}</div>` +
                    `<div>${item.distance}km</div>` +
                `</div>` +
                `<div class="blank"></div>`+
            '</div>';

        setCustomOverlay(content, position);
    }

    // hover 기능 off
    const handleOnMouseLeave = () => {
        setIsHover(false);
        marker.setMap(null);

        removeLinePath()
    }

    // line path를 출력할 함수 구현
    const createLinePath = () => {
        const linePath = [];
        linePath.push(station.position);
        linePath.push(position);

        // 지도에 선을 표시합니다
        stationToRestaurantPolyline.setPath(linePath);
        stationToRestaurantPolyline.setMap(map);
    }
    // line path를 지우는 함수 구현
    const removeLinePath = () => {
        stationToRestaurantPolyline.setMap(null);
    }

    // overlay의 정보를 설정한다.
    const setCustomOverlay = (content, position) => {
        // console.log(content);
        // console.log(position);

        customOverlay.setContent(content);
        customOverlay.setPosition(position);
        customOverlay.setMap(map);
    }

    return (
        <div className="MainListItem"
             onMouseLeave={()=>{
                 setIsHover(false);
             }}
             onMouseEnter={handleOnMouseEnter}
             style={isHover ? {background: "lightgray"} : {}}
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