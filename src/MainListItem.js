import React, {useState} from "react";

const {kakao} = window;

const MainListItem = (
    {
        restaurant,
        map,
        marker,
        station,
        stationToRestaurantPolyline,
        customOverlay,
    }) => {
    const [isHover, setIsHover] = useState(false);
    const position = new kakao.maps.LatLng(restaurant.lon, restaurant.lat);

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
            `<div>${restaurant.name}</div>` +
            `<div>${restaurant.distance}km</div>` +
            `</div>` +
            `<div class="blank"></div>` +
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
    // https://map.kakao.com/link/to/카카오판교오피스,37.402056,127.108212
    //`https://map.kakao.com/link/to/${station.name},${station.lon},${station.lat}?sName=${station.name}`
    //`https://map.kakao.com/?sName=${station.name}&eName=${restaurant.name}`
    const onClickMoveToDirectionPage = () => {
        const url = `https://map.kakao.com/?sName=${station.name}&eName=${restaurant.name}`;
        window.open(url);
    }

    return (
        <div className="MainListItem"
             onClick={onClickMoveToDirectionPage}
             onMouseLeave={() => {
                 setIsHover(false);
             }}
             onMouseEnter={handleOnMouseEnter}
             style={isHover ? {background: "lightgray"} : {}}
        >
            <div className="Info">
                <span className="RestaurantName">{restaurant.name}</span><br/>
                <span>역에서 식당까지 거리 : {restaurant.distance}km</span><br/>
                <span>동 : {restaurant.dong}</span><br/>
                <div className="Categories">
                    <span>{restaurant.cate1}</span>
                    <span>{restaurant.cate2}</span>
                    <span>{restaurant.cate3}</span>
                </div>
            </div>
        </div>
    );
}

export default React.memo(MainListItem);