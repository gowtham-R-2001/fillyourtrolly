import { Product } from "./Product";
import { useState, useEffect, useContext } from "react";
import { WishlistContext } from "./WishlistContext";
import Axios from "axios";

export function Wishlist () {
    const [products, setProducts] = useState([]);
    let userContext = useContext(WishlistContext);

    // useEffect(() => {
    //     const url = `http://localhost:9000/wishlist/?user="${}"`;
    //     Axios.post(url)
    //      .then(response => {console.log(response.data);})
    //      .catch(err => {console.log(err);});
    // },[]);

    return (
        <WishlistContext.Consumer>
            {
                (context) => {
                    return (
                        <div className="wishlist">
                            <div className="heart-holder">
                                    <i className="fa fa-heart"></i>
                                    <i className="fa fa-heart"></i>
                                </div>
                            <h1>My wishlist</h1>
                            {
                                context.wish.map((product, key) => {
                                    return(
                                        <Product
                                            key={key}
                                            imgLink={product.imgLink}
                                            title={product.title}
                                            price={product.price}
                                            rating={product.rating}
                                            totalRating={product.totalRating}
                                            link={product.link}
                                            button1={"Buy"}
                                            button2={"Remove"}
                                            contType="wishlist-comp"
                                        />
                                    );
                                })
                            }
                        </div>
                    );
                }
            }
        </WishlistContext.Consumer>
    );
}