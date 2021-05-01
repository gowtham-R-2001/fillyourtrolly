import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "./helpers/Loader";
import { Product } from "./Product";

export function CommonProduct(props) {
    const [commonProducts, setCommonProducts] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    let param = useParams();

    useEffect(() => {
        if(["men_women","mobiles","laptops","appliances","fitness"].includes(param.item)) {
            setIsValid(true);
            let item = param.item;
            const url = `http://localhost:9000/search/${item}`;
            setTimeout(() => {
                Axios.get(url)
                .then(response => {
                    response.data.length > 0 ? setCommonProducts(response.data) : setIsValid(false);
                    setShowLoader(false);
                })
                .catch(err => {
                    console.log(err); 
                    setShowLoader(false);
                })
            }, 1500);
        }
        else {
            setShowLoader(false)
            setIsValid(false);
        }
    },[]);

    return (
        <div className="common-product">
            <h2 className="title"> {param.item} </h2>
            {showLoader && <Loader type="search" size="0.5" />}
            {!isValid && <h2> Not found </h2>}
            {
                isValid && commonProducts.length > 0 && commonProducts.map((product, key) => {
                    return (
                        (parseInt(product.price.replace(",","")) > 0)
                            &&
                        <Product
                          key = {key}
                          imgLink={product.imageLink}
                          title={product.title}
                          price={product.price}
                          rating={product.starRating}
                          totalRating={product.totalRating}
                          link={product.link}
                          button1={"Buy"}
                          button2={"Add to wishlist"}
                          contType="product-comp"
                        />
                    );
                })    
            }
        </div>
    );
}