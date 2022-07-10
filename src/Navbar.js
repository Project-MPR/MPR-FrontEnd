import {useEffect, useState} from "react";

const Navbar = ({stationDispatch}) => {
    const [search, setSearch] = useState();
    const [stations, setStations] = useState([]);
    const [results, setResults] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    // 모든 역 데이터 가져오기
    const getStations = async () => {
        await fetch("http://localhost:8080/api/stations")
            .then(res => res.json())
            .then(res => setStations(res));
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
        console.log("click li");
        e.preventDefault();
        stationDispatch({type: 'INIT', data: item});
        setSearch(item.name);
        setIsFocus(false);
    }

    return (
        <div className="Navbar">
            <span>역 검색 :</span>
            <div className="NavInputWrapper"
                style={isFocus ?
                    {
                        border: "2px solid blue",
                        boxShadow: "4px 4px 4px -3px",
                        backgroundColor: "rgba(255,255,255,1)"
                    } :
                    {
                        border: "none",
                        boxShadow: "0 0 0 0",
                        backgroundColor: "rgba(0,0,0,0)"
                    }}>
                <input
                    className="NavInput"
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
                />
                <div className="NavInputList"
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
    )
}

export default Navbar;
