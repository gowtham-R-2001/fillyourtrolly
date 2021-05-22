import { Product } from "./Product";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "./helpers/Loader";
import Axios from "axios";
import { sort } from "./helpers/sort";
import { Error } from "./helpers/Error.js";
import { Link } from "react-router-dom";
import { WishlistContext } from "./WishlistContext";

export function ProductDisplay() {
  let param = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [noresult, setNoresult] = useState(false);

  let filter = ((param.filter) && (param.filter === "highprice" || param.filter === "lowprice")) ? param.filter : "highprice";

  const [showProducts, setShowProducts] = useState([]);
  const [range, setRange] = useState(18);
  const [isProductLoading, setIsProductLoading] = useState(false);

  useEffect(() => {
    if(products.length > 0)
      sort(filter, products, (sortedData) => setProducts(sortedData));
  },[]);

  useEffect(() => {
    if(products.length > 0)
      productsDynamicLoad(products);
  },[products]);


  const productsDynamicLoad = (products, e=null) => {
    if(e) {
        if((range < products.length) && (e.target.scrollTop + window.innerHeight >= (e.target.scrollHeight)) ) {
            setIsProductLoading(true);
            setTimeout(() => {
              setShowProducts(showProducts.concat(products.slice(range-18, range)));
              setRange(range + 18);
              setIsProductLoading(false);
            }, 2000);
        }
        return;
    }

    setShowProducts(showProducts.concat(products.slice(range-18, range)));
    setRange(range + 18);
  }

  useEffect(() => {
    let item = param.item;
    const url = `http://localhost:9000/searchproduct/${item}`;

    setTimeout(() => {
      Axios.post(url)
        .then((response) => {
          if(response.data.length <= 0) {
            setNoresult(true);
          }
          else if(response.data.data) {
            if(response.data.data.code === "ECONNREFUSED")
              setError(true);
          }
          else if(response.status === 200)
            sort(filter, response.data, (sortedData)=> setProducts(sortedData));
          else
            setError(true);
        })
        .catch((err) => {console.log(err); setError(true)});
    }, 1500);
  }, []);

  const handleChange = (e) => document.querySelector(`#${e.target.value}`).click();

  return (
    <WishlistContext.Consumer>
      {
        (context) => {
          if(context.productDisplayProducts.length <= 0) {
            context.productDisplayProducts = products;
          }

          return (
            <div className="product-display">      
            {
              (error === false) && <div className="filter-holder">
                  <span className="prompt"> Filter by </span>
                  <div className="myFilter-holder">
                    <select className="myFilter" value={filter} onChange={(e) => handleChange(e)}>
                      <option value={"highprice"}> High price </option> 
                      <option value={"lowprice"}> Low price </option>
                    </select>
                    <Link id="highprice" to={`/search/${param.item}/${"highprice"}`}></Link>
                    <Link id="lowprice" to={`/search/${param.item}/${"lowprice"}`}></Link>
                  </div>
              </div>
            }
            {noresult === true && <Error errorMessage="No results found" color="#eed202" />}
            {(error === true) && <Error errorMessage=" Server Down :(" color="#cc0000" />}
            {(error === false) && (noresult === false) && showProducts.length <= 0 && <Loader type="search" size="0.5" />}
            <div className="products" onScroll={(e) => productsDynamicLoad(products, e)}>
            {showProducts.length > 0 &&
              showProducts.map((product, key) => {
                return (
                  parseInt(product.price.replace(",", "")) > 0 &&
                  product.totalRating &&
                  product.starRating && (
                    <Product
                      key={key}
                      {...product}
                      button1={"Buy"}
                      button2={"Add to wishlist"}
                      contType="product-comp"
                    />
                  )
                );
              })}
              <br />
              <br />
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