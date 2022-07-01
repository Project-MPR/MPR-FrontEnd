import {useState} from "react";

const Navbar = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="Navbar">
            <span>역 검색 : </span>
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