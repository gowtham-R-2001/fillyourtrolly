import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { Loader } from "./helpers/Loader";
import { useState } from "react";
import { Error } from "./helpers/Error";
import { Success } from "./helpers/Success";

export function Admin() {
    const [scrapProduct, setScrapProduct] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [scrapError, setScrapError] = useState(false);
    const [ScrapSuccess, setScrapSuccess] = useState(false);
    const [counts, setCounts] = useState({count: 0, totalCount: 0});

    const handleScrap = () => {
        if(scrapProduct)
        {
            setScrapError(false);
            setScrapSuccess(false);
            setShowLoader(true);
            const url = `http://localhost:9000/scrap/${scrapProduct}`;
            Axios.post(url)
                .then(response => {   
                    console.log(response);
                    console.log(response.data);
                    console.log(response.data.data);

                    if("Success".includes(response.data.code))
                    {
                        setCounts({count: response.data.insertionCount, totalCount: response.data.totalProducts});
                        setScrapSuccess(true);
                    }
                    else
                    {
                        setScrapSuccess(false);
                        setScrapError(true);
                    }
                    setShowLoader(false);
                })
                .catch(err => {
                    console.log(err);
                    setScrapError(true);
                    setShowLoader(false);
                });
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

            {ScrapSuccess && <> <br /><br /><br /> <Success successMessage={`Scrap Success ~ Total Products : ${counts.totalCount}, Inserted Products: ${counts.count}`} color="green" />  </>}
            {scrapError && <> <br /><br /><br /> <Error errorMessage="Some Error Occured" color="#cc0000" /></>}
            {showLoader && <Loader type="search" size="0.5" />}
        </div>
    );
}