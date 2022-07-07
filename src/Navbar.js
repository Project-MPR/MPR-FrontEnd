import {useState} from "react";

const Navbar = ({search, results, updateFiled}) => {
    const [search, setSearch] = useState("");

    const updateText = text => {
        updateFiled("search", text, false);
        updateFiled("results", []);
    };

    var renderResults;
    const arr = results['results'];
    if(arr){
        renderResults = arr.map((item => {
            return (
                <SearchView
                    updateText={updateText}
                    name={item.name}
                    code={item.code}
                    key={item.code}
                />
            );
        }));
    }
    return (
        <div className="Navbar">
            <span>역 검색 : </span>
            <input
                className="NavInput"
                value={search || ""}
                onChange={e => updateFiled("search", e.target.value)}
            />
            <div className="search-results">{renderResults}</div>
        </div>
    );
    }

const SearchView = ({name, code, index, updateText}) => {
    return (
        <div
            onClick={() => updateText(name)}
            className={'search-preview ${index === 0 ? }"start":""}'}
        >
            <div className="first">
                <p className="name">{name}</p>
                <p className="code">{code}</p>
            </div>

        </div>
        )
}

export default Navbar;