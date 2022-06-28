import MainListItem from "./MainListItem";
import React from "react";

const MainList = ({listContent, map, marker}) => {

    return (
        <div className="MainList">
            {
                listContent && listContent.map(it => <MainListItem
                    key={it.id}
                    item={it}
                    map={map}
                    marker={marker}
                />)
            }
        </div>);
}

MainList.defaultProps = {
    listContent: []
}

export default React.memo(MainList);