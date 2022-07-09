import {useEffect, useState} from "react";

const Navbar = ({stationDispatch}) => {
    const [search, setSearch] = useState();
    const [stations, setStations] = useState([]);
    const [results, setResults] = useState([]);

    // 모든 역 데이터 가져오기
    const getStations = async ()=>{
        await fetch("http://localhost:8080/api/stations")
                .then(res => res.json())
                .then(res => setStations(res));
    }
    useEffect(() =>{
        getStations();
    }, []);
    // let sts = stations.slice(0, stations.length/2);
    // console.log(sts);
    // 입력받는 text에 따른 자동완성 list
    // 입력받은 문자열을 키워드와 비교, 매칭되는지 확인
    const matchText = (name, search) => {
        var searchLen = search.length;
        name = name.substring(0, searchLen);
        if (search === "") return false;
        console.log(name === search.toString());
        return name === search.toString();
    };

    // 매칭 후 해당 값을 list 로 저장
    const onSearch = text => {
        var result = stations.filter(item => true === matchText(item.name, text));
        console.log(result);
        setResults({result});
        console.log(results);
    };
    
    const renderResults = () => {
        results.map((item) => {
            return (
                <AutoCompleteList name={item.name}/>
            );
        });
    };

    return (
        <div className="Navbar">
            <div>역 검색 :</div>
            <input
                className="NavInput"
                value={search || ''}
                onChange={e => {
                    onSearch(e.target.value)
                    setSearch(e.target.value)
                    console.log(e.target.value)
                    console.log(results)
                }}
            />
            {results && renderResults}
        </div>
        )
}

const AutoCompleteList = ({name}) => {
    return(
        <div>
            <div>
                <p>{name}</p>
            </div>
        </div>
    );
}

export default Navbar;