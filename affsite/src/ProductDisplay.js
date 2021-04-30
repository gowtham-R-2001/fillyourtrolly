import { Product } from "./Product";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "./helpers/Loader";
import Axios from "axios";
import { sort } from "./helpers/sort";
import { Error } from "./Error.js";
import { Link } from "react-router-dom";

export function ProductDisplay() {
  let param = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  let filter = ((param.filter) && (param.filter === "highprice" || param.filter === "lowprice")) ? param.filter : "highprice";

  useEffect(() => {
    if(products.length > 0)
      sort(filter, products, (sortedData) => setProducts(sortedData));
  });

  useEffect(() => {
    let item = param.item;
    const url = `http://localhost:9000/search/${item}`;

    setTimeout(() => {
      Axios.get(url)
        .then((response) => {
          if(response.status === 200)
            sort(filter, response.data, (sortedData)=> setProducts(sortedData));
          else
            setError(true);
        })
        .catch((err) => {console.log(err); setError(true)});
    }, 1500);
  }, []);

  const handleChange = (e) => document.querySelector(`#${e.target.value}`).click();

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
      {(error === true) && <Error errorMessage=" Server Down :(" />}
      {(error === false) && products.length <= 0 && <Loader type="search" size="0.5" />}
      <div className="products">
      {products.length > 0 &&
        products.map((product, key) => {
          return (
            parseInt(product.price.replace(",", "")) > 0 &&
            product.totalRating &&
            product.starRating && (
              <Product
                key={key}
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
            )
          );
        })}
      </div>
    </div>
  );
}