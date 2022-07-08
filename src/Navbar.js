import {useState} from "react";

const Navbar = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="Navbar">
            <div>역 검색 :</div>
            <input
                className="NavInput"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
            />
        </div>)
}
export default Navbar;