import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "./helpers/Loader";
import { Product } from "./Product";
import { sort } from "./helpers/sort";
import { Error } from "./helpers/Error";
import { Link } from "react-router-dom";
import { WishlistContext } from "./WishlistContext";

export function CommonProduct() {
    let param = useParams();
    const [commonProducts, setCommonProducts] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState(false);
    let filter = ((param.filter) && (param.filter === "highprice" || param.filter === "lowprice")) ? param.filter : "highprice";

    const [showProducts, setShowProducts] = useState([]);
    const [range, setRange] = useState(18);
    const [isProductLoading, setIsProductLoading] = useState(false);

    useEffect(() => {
        if(commonProducts.length > 0)
            sort(filter, commonProducts, (sortedData) => setCommonProducts(sortedData));
    },[]);

    useEffect(() => {
        if(commonProducts.length > 0)
            productsDynamicLoad(commonProducts);
    },[commonProducts]);

    const productsDynamicLoad = (commonProducts, e=null) => {
        if(e) {
            if((range < commonProducts.length) && (e.target.scrollTop + window.innerHeight >= (e.target.scrollHeight)) ) {
                    setIsProductLoading(true);
                    setTimeout(() => {
                    setShowProducts(showProducts.concat(commonProducts.slice(range-18, range)));
                        setRange(range + 18);
                        setIsProductLoading(false);
                    }, 2000);
            }
            return;
        }

        setShowProducts(showProducts.concat(commonProducts.slice(range-18, range)));
        setRange(range + 18);
    }

    useEffect(() => {
        if(["men_women","mobiles","laptops","appliances","fitness"].includes(param.item)) {
            setIsValid(true);
            let item = param.item;
            const url = `http://localhost:9000/search/${item}`;
            setTimeout(() => {
                Axios.get(url)
                .then(response => {
                    if(response.data.data)
                    {
                        if(response.data.data.code === "ECONNREFUSED")
                        setError(true);
                    }
                    else if(response.status === 200)
                        sort(filter, response.data, (sortedData)=> setCommonProducts(sortedData));
                    else
                        setError(true);
                })
                .catch(err => console.log(err))
            }, 1500);
        }
        else {
            setIsValid(false);
            setError(true);
        }
    },[]);

    const handleChange = (e) => document.querySelector(`#${e.target.value}`).click();

    return (
        <WishlistContext.Consumer>
            {
                (context) => {
                    if(context.commonDisplayProducts.length <= 0) {
                        context.commonDisplayProducts = commonProducts;
                        console.log("EMPTY ", commonProducts);
                    }
                    return (
                        <div className="common-product">
                        {(isValid === false) && <Error errorMessage="Not Found" color="#eed202" />}
                        {
                            (error === false) && (isValid === true) && <div className="filter-holder">
                                <span className="prompt"> Filter by </span>
                                <div className="myFilter-holder">
                                <select className="myFilter" value={filter} onChange={(e) => handleChange(e)}>
                                    <option value={"highprice"}> High price </option> 
                                    <option value={"lowprice"}> Low price </option>
                                </select>
                                <Link id="highprice" to={`/commonproduct/${param.item}/${"highprice"}`}></Link>
                                <Link id="lowprice" to={`/commonproduct/${param.item}/${"lowprice"}`}></Link>
                                </div>
                            </div>
                        } 
                        {(isValid === true) && (error === true) && <Error errorMessage=" Server Down :(" />}
                        <div className="products" onScroll={(e) => productsDynamicLoad(commonProducts, e)}>
                            {(error === false) && (isValid === true) && showProducts.length <= 0 && <Loader type="search" size="0.5" />}
                            {
                                isValid && (error === false) && showProducts.length > 0 && showProducts.map((product, key) => {
                                    return (
                                        parseInt(product.price.replace(",", "")) > 0 &&
                                        product.totalRating &&
                                        product.starRating && (
                                        <Product
                                            key = {key}
                                            {...product}
                                            button1={"Buy"}
                                            button2={"Add to wishlist"}
                                            contType="product-comp"
                                        />
                                    ));
                                })
                            }
                            {isProductLoading && 
                                <span className="loading-holder">
                                    <Loader type="load" height="50px" width="50px" /> {"Loading..."}
                                </span>
                            }
                        </div>
                    </div>
                    );
                }
            }    
        </WishlistContext.Consumer>
    );
}