import { Loader } from "./Loader";
import { useState } from "react";

export function ImageLoader(props) {
    const [showLoader, setShowLoader] = useState(true);

    return(
        <div className="img-holder" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img className={props.className} src={props.src} onLoad={() => setShowLoader(false)} />
            {showLoader && <i className="fa fa-spinner"></i>}
            {/* {showLoader && <Loader style={{position: "absolute"}} type="load" height="80px" width="80px" />} */}
        </div>
    );
}