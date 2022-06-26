import {useState} from "react";

const MainListItem = ({item}) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className="MainListItem"
             onMouseOut={() => {
                 setIsHover(false)
             }}
             onMouseOver={() => {
                 setIsHover(true)
             }}
             style={isHover ? {background : "lightgray"} : {}}
        >
            <div className="info">
                <span>식당 이름 : {item.r_name}</span><br/>
                <span>역에서 식당까지 거리 : {item.station_to_r_time}</span>
            </div>
        </div>
    );
}

export default MainListItem;