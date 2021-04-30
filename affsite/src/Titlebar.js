import { IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Titlebar() {
    const[switchState, setSwitchState] = useState(true);

    useEffect(() => {
        if(window.innerWidth < 400)
            document.querySelector(".titlebar h2").textContent = "FYT";
    },[]);

    const toggleHandler = () => {
        let toggle = document.querySelector(".toggle");
        let toggleButton = document.querySelector(".icon-toggle");

        if(switchState)
        {
            toggle.style.transform = "translateX(0px)";
            toggle.style.backgroundColor = "#000";
            toggleButton.setAttribute('class','icon-toggle fa fa-moon-o');
        }
        else
        {
            toggle.style.backgroundColor = "#0077FF";
            toggleButton.setAttribute('class','icon-toggle ');
            toggle.style.transform = "translateX(-30px)";
        }

        setSwitchState(!switchState);
    }

    return (
        <div className="titlebar">
            <h2>Fill Your Trolly</h2>
            <div className="helper-holder" >
                <IconButton onClick={() => toggleHandler()}>
                    <span className="switch">
                        <div className="toggle">
                            <i className="icon-toggle"></i>
                        </div>
                    </span>
                </IconButton>

                <Link to="/profile">
                    <IconButton style={{padding: "10px"}}>
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </IconButton>
                </Link>

                <Link to="/wishlist">
                    <IconButton style={{padding: "10px"}}>
                        <i className="fa fa-heart" aria-hidden="true"></i>
                    </IconButton>
                </Link>
            </div>
        </div>
    );
}