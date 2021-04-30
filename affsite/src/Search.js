import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { popper } from "./helpers/popper" ;

export function Search() {
    let isFocus = false;
    const [item, setItem] = useState("");

    useEffect(() => {
        document.querySelector("#search-input").addEventListener("focus", () => isFocus = true);
        document.querySelector("#search-input").addEventListener("focusout", () => isFocus = false);

        document.addEventListener('keypress', (e) => {
            if (isFocus && e.key === "Enter")
                handleEnter();
        })
    } ,[]);

    const handleEnter = () => {
        let searchInput = document.querySelector("#search-input");
        if(searchInput.value.length > 0)
            document.querySelector("#search-a").click();
        else
            popper("Can't search a empty value");
    }

    const handleChange = (e) => {
        setItem(e.target.value);
    }

    return (
        <div className="search">
            <input type="text" id="search-input" onChange={(e) => handleChange(e)} placeholder="Search" />
            <i className="fa fa-search" onClick={() => handleEnter()}></i>
            <Link id="search-a" to={"/search/"+item}></Link>
        </div>
    );
}