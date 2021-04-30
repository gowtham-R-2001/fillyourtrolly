import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { Loader } from "./helpers/Loader";
import { useEffect, useState } from "react";

export function Admin() {
    const [scrapProduct, setScrapProduct] = useState("");
    const [showLoader, setShowLoader] = useState(false);

    const handleScrap = () => {
        if(scrapProduct)
        {
            setShowLoader(true);
            const url = `http://localhost:9000/scrap/${scrapProduct}`;
            Axios.post(url)
                .then(data => {console.log(data); setShowLoader(false); })
                .catch(err => {console.log(err);  setShowLoader(false); });
        }
    }

    return (
        <div className="admin-panel" style={{display: "flex", flexDirection: "column", justifyContent: "center" , alignItems: "center",margin: "auto"}}>
            <TextField
                type="text"
                style={{maxWidth: "fit-content", marginTop: "20px"}}
                onChange={(e) => {setScrapProduct(e.target.value)}}
                name="scrap-input"
                id="scrap-input"
                label="Item name"
                variant="outlined"
            />

            <Button
                id="scrap-btn"
                style={{maxWidth: "fit-content", marginTop: "20px"}}
                variant="contained"
                size="medium"
                color="primary"
                onClick={() => { handleScrap() }}
            >
                Scrap
            </Button>

            {showLoader && <Loader type="search" size="0.5" />}
        </div>
    );
}