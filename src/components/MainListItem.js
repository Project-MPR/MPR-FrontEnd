import React, {useCallback, useContext, useMemo, useState} from "react";
import {MainListStationStateContext} from "../pages/Home";
import {color} from "../state";

const {kakao} = window;

const MainListItem = ({restaurant}) => {
    const [isHover, setIsHover] = useState(false);
    const position = new kakao.maps.LatLng(restaurant.lon, restaurant.lat);

    const {map, marker, station, polyline, overlay} = useContext(MainListStationStateContext);

    const getColorByDistance = useCallback((distance) => {
        if (distance < 0.3) {
            return color.green;
        } else if (distance < 0.6) {
            return color.yellow;
        } else {
            return color.red;
        }
    }, []);

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

    // line path를 출력할 함수 구현
    const createLinePath = () => {
        const linePath = [];
        linePath.push(station.position);
        linePath.push(position);

        // 지도에 선을 표시합니다

        polyline.setOptions({
            strokeWeight: 6, // 선의 두께 입니다
            strokeColor: getColorByDistance(restaurant.distance), // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'shortdashdot' // 선의 스타일입니다
        });
        polyline.setPath(linePath);
        polyline.setMap(map);
    }

    // overlay의 정보를 설정한다.
    const setCustomOverlay = (content, position) => {

        overlay.setContent(content);
        overlay.setPosition(position);
        overlay.setMap(map);
    }

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
             style={isHover ? {background: getColorByDistance(restaurant.distance), color: "white"} : {color: "black"}}
        >
            <div className="Info">
                <div className="RestaurantName">{restaurant.name}</div>
                <div>역에서 식당까지 거리 : {restaurant.distance}km</div>
                <div>동 : {restaurant.dong}</div>
                <div className="Categories">
                    <div>{restaurant.cate_1}</div>
                    <div>{restaurant.cate_2}</div>
                    <div>{restaurant.cate_3}</div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(MainListItem);