import {useState} from "react";

const Navbar = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="Navbar">
            <div className="NavInfo">
                <span>Nav</span>
                <input
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    type="text"
                />
            </div>
        </div>)
}
export default Navbar;