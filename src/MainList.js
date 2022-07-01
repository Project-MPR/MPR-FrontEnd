import MainListItem from "./MainListItem";
import React from "react";

const MainList = (
    {
        restaurants,
        map,
        marker,
        station,
        stationToRestaurantPolyline,
        customOverlay,
    }
) => {
    return (
        <div className="MainList">
            {
                restaurants && restaurants.map(it => <MainListItem
                    key={it.id}
                    restaurant={it}
                    map={map}
                    marker={marker}
                    station={station}
                    stationToRestaurantPolyline={stationToRestaurantPolyline}
                    customOverlay={customOverlay}
                />)
            }
        </div>);
}

MainList.defaultProps = {
    listContent: []
}

export default React.memo(MainList);