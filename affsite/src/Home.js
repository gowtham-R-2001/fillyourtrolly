import { HomeProducts } from "./HomeProducts";
import { ImageLoader } from "./helpers/ImageLoader";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Error } from "./helpers/Error";
import { Loader } from "./helpers/Loader";
import { WishlistContext } from "./WishlistContext";
import { Footer } from "./Footer";

export function Home() {
    const [topdealsProducts, setTopdealsProducts] = useState([]);
    const [newarrivalsProducts, setNewarrivalsProducts] = useState([]);
    const [error, setError] = useState(false);
    const [topdealsLoader, setTopdealsLoader] = useState(true);
    const [newarrivalsLoader, setnewarrivalsLoader] = useState(true);

    const [topdealsShowProducts, setTopdealsShowProducts] = useState([]);
    const [topdealsRange, setTopdealsRange] = useState(18);
    const [isProductLoading1, setIsProductLoading1] = useState(false);

    const [newarrivalsShowProducts, setNewarrivalsShowProducts] = useState([]);
    const [newarrivalsRange, setNewArrivalsRange] = useState(18);
    const [isProductLoading2, setIsProductLoading2] = useState(false);

    const getTopDeals = () => {
        Axios.get(`http://localhost:9000/search/new_arrivals_in_amazon`)
        .then(response => {
            if(response.data.data) {
                if(response.data.data.code === "ECONNREFUSED") {
                    setnewarrivalsLoader(false);
                    setError(true);
                }
            }
            else {
                setTopdealsProducts(response.data);
                setnewarrivalsLoader(false);
            }
        })
        .catch(err => {
            console.log(err);
            setError(true);
            setnewarrivalsLoader(false);
        })
    }

    const getNewArrivals = () => {
        Axios.get(`http://localhost:9000/search/best_offers`)
        .then(response => {
            if(response.data.data) {
                if(response.data.data.code === "ECONNREFUSED") {
                    setTopdealsLoader(false);
                    setError(true);
                }
            }
            else {
                setNewarrivalsProducts(response.data);
                setTopdealsLoader(false);
            }
        })
        .catch(err => {
            console.log(err);
            setError(true);
            setTopdealsLoader(false);
        })
    }

    useEffect(() => {
        getTopDeals();
        getNewArrivals();
    },[]);

    useEffect(() => {
        topdealsDynamicLoad(topdealsProducts);
    },[topdealsProducts]);

    useEffect(() => {
        newarrivalsDynamicLoad(newarrivalsProducts);
    },[newarrivalsProducts]);

    const topdealsDynamicLoad = (products, e=null) => {
        if(e) {
            if((topdealsRange < products.length) && (e.target.scrollLeft + window.innerWidth >= (e.target.scrollWidth-10)) ) {
                setIsProductLoading1(true);
                setTimeout(() => {
                    setTopdealsShowProducts(topdealsShowProducts.concat(...products.slice(topdealsRange-10, topdealsRange)));
                    setTopdealsRange(topdealsRange + 10);
                    setIsProductLoading1(false);
                }, 2000);
            }
            return;
        }

        setTopdealsShowProducts(topdealsShowProducts.concat(...products.slice(topdealsRange - 18, topdealsRange)));
        setTopdealsRange(topdealsRange + 10);
    }

    const newarrivalsDynamicLoad = (products, e=null) => {
        if(e) {
            if((newarrivalsRange < products.length) && (e.target.scrollLeft + window.innerWidth >= (e.target.scrollWidth-10)) ) {
                setIsProductLoading2(true);
                setTimeout(() => {
                    setNewarrivalsShowProducts(newarrivalsShowProducts.concat(...products.slice(newarrivalsRange-10, newarrivalsRange)));
                    setNewArrivalsRange(newarrivalsRange + 10);
                    setIsProductLoading2(false);
                }, 2000);
            }
            return;
        }

        setNewarrivalsShowProducts(newarrivalsShowProducts.concat(...products.slice(newarrivalsRange - 18, newarrivalsRange)));
        setNewArrivalsRange(topdealsRange + 10);
    }

    return (
        <WishlistContext.Consumer>
            {
                (context) => {
                    if(context.topdealsProducts.length <= 0 || context.newarrivalsProducts.length <= 0) 
                    {
                        context.topdealsProducts = topdealsProducts;
                        context.newarrivalsProducts = newarrivalsProducts;
                    }

                    return (
                        <div className="home">
                            <ImageLoader src="realme.jpg" className="banner" />
                            <div className="home-products-holder" style={{background: "#FFFFFF"}} >
                                <span className="heading"> Top deals </span>
                                <div className="home-products" onScroll={(e) => topdealsDynamicLoad(context.topdealsProducts,e)} >
                                    {!topdealsLoader && !error && (topdealsShowProducts.length > 0) && topdealsShowProducts.map((product, key) => {
                                            return (
                                                parseInt(product.price.replace(",", "")) > 0 &&
                                                product.totalRating &&
                                                product.starRating && 
                                                <HomeProducts
                                                    key={key}
                                                    {...product}
                                                />
                                            );
                                    })}
                                    {isProductLoading1 && 
                                        <span style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <Loader type="load" height="50px" width="50px" /> {"Loading..."}
                                        </span>
                                    }
                                    {error && <Error errorMessage="Error Occurred" color="#cc0000" />}
                                    {topdealsLoader && <Loader type="load" height="80px" width="80px" />}
                                </div>
                            </div>

                            <ImageLoader src="k20.jpg" className="banner" />
                            <div className="home-products-holder" style={{background: "#FFFFFF", borderRadius: "20px"}}>
                                <span className="heading"> New Arrivals </span>
                                <div className="home-products" onScroll={(e) => newarrivalsDynamicLoad(context.newarrivalsProducts,e)}>
                                    {!newarrivalsLoader && !error && (newarrivalsShowProducts.length > 0) && newarrivalsShowProducts.map((product, key) => {
                                        return (
                                            parseInt(product.price.replace(",", "")) > 0 &&
                                            product.totalRating &&
                                            product.starRating && 
                                            <HomeProducts
                                                key={key}
                                                {...product}
                                            />
                                        );
                                    })}
                                    {isProductLoading2 && 
                                        <span style={{margin: "auto 70px auto 40px"}}>
                                            <Loader type="load" height="50px" width="50px" /> {"Loading..."}
                                        </span>
                                    }
                                    {error && <Error errorMessage="Error Occurred" color="#cc0000" />}
                                    {newarrivalsLoader && <Loader type="load" height="80px" width="80px" />}
                                </div>
                            </div>
                            {/* <br /><br /> */}
                            <Footer />
                        </div>
                    );
                }
            }
        </WishlistContext.Consumer>
    );
}