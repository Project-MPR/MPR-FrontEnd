import React, {useContext} from "react";
import MainListItem from "./MainListItem";
import {MainListDataStateContext} from "../pages/Home";

const MainList = () => {
    // reducer를 통해서 사용한 전역 데이터 가지고 오기
    const restaurants = useContext(MainListDataStateContext);

    return (
        <div className="MainList">
            {
                restaurants && restaurants.map(it => <MainListItem
                    key={it.id}
                    restaurant={it}
                />)
            }
        </div>);
}

MainList.defaultProps = {
    listContent: []
}

export default React.memo(MainList);