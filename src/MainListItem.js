const MainListItem = ({item}) => {

    return (
            <div className="MainListItem">
            <h2>list element</h2>
            <div className="info">
                <span>식당 이름 : {item.r_name}</span><br/>
                <span>역에서 식당까지 거리 : {item.station_to_r_time}</span>
            </div>

        </div>
    );
}

export default MainListItem;