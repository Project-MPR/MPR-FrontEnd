import React, {useContext} from "react";
import MainListItem from "./MainListItem";
import {MainListDataStateContext} from "../pages/Home";
import {useState} from "react";
import '../toggle.css'

const MainList = () => {
    // reducer를 통해서 사용한 전역 데이터 가지고 오기
    const restaurants = useContext(MainListDataStateContext);

    // 토글 구현
    const[isOpen, setNav] = (useState(false));
    const toggleNav = () => {
        setNav(isOpen => !isOpen)
    };

    return (
        <div className="MainList">
            {/*<a className="toggleBtn" onClick={toggleNav}>&#9661;</a>*/}
            {/*<div className={isOpen ? 'toggleBox show-nav' : 'toggleBox nav-links'}>*/}
            {/*    <ul className='toggleList'>*/}
            {/*        <li>1</li>*/}
            {/*        <li>2</li>*/}
            {/*        <li>3</li>*/}
            {/*        <li>4</li>*/}
            {/*        <li>5</li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
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