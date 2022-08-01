import "./Search.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {apiStations} from "../api/server";

const Search = ({stationDispatch}) => {
    const [search, setSearch] = useState();
    const [stations, setStations] = useState([]);
    const [results, setResults] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    const navigate = useNavigate();

    // 모든 역 데이터 가져오기
    const getStations = async () => {
        apiStations().then(res => setStations(res));
    }
    useEffect(() => {
        getStations();
    }, []);

    // 입력받는 text에 따른 자동완성 list
    // 입력받은 문자열을 키워드와 비교, 매칭되는지 확인
    const matchText = (name, search) => {
        var searchLen = search.length;
        name = name.substring(0, searchLen);
        if (search === "") return false;
        return name === search.toString();
    };

    // 매칭 후 해당 값을 list 로 저장
    const onSearch = text => {
        var result = stations.filter(item => true === matchText(item.name, text));
        setResults(result);
    };

    const onClickLi = (e, item) => {
        e.preventDefault();
        stationDispatch({type: 'INIT', data: item});
        setSearch(item.name);
        setIsFocus(false);
    }

    // 그냥 엔터를 누른 경우 가장 상단의 역으로 이동하기
    const keyPressDownEnter = (e) => {
        if (e.keyCode === 13 && results.length !== 0) {
            stationDispatch({type: 'INIT', data: results[0]});
            setSearch(results[0].name);
            setIsFocus(false);
            navigate("/home");
        }
    }

    return (
        <div className="Search">
            <div className="header"></div>
            <div className="search_wrapper">
                <img
                    className={"MPR_LOGO"}
                    src={process.env.PUBLIC_URL + "/mpr-icon.png"} alt={"mpr_image"}
                    style={{width: 272, height: 272}}/>
                <br/>
                <div style={{fontSize:25}}>찾고자 하는 역을 입력해 주세요</div>

                <div className="search_input_wrapper"
                     style={isFocus ? {border: "2px solid gray"} : {border: "none"}}
                >
                    <input
                        className="SearchInput"
                        value={search || ''}
                        onChange={e => {
                            onSearch(e.target.value)
                            setSearch(e.target.value)
                        }}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => {
                            setTimeout(() => {
                                setIsFocus(false);
                            }, 100);
                        }}
                        onKeyDown={keyPressDownEnter}
                    />
                    <div className="SearchInputList"
                         style={isFocus ? {zIndex: 999} : {zIndex: -999}}>
                        {isFocus && results &&
                            results.map(item =>
                                <div key={item.name} onClick={e => onClickLi(e, item)}>
                                    {item.name}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="footer"></div>
        </div>);
}

export default Search;