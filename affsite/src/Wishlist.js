import { Product } from "./Product";
import { WishlistContext } from "./WishlistContext";

export function Wishlist () {
    return (
        <WishlistContext.Consumer>
            {
                (context) => {
                    console.log("Wishlist : ", context.wish);
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
                                            imageLink={product.imageLink}
                                            title={product.title}
                                            price={product.price}
                                            starRating={product.starRating}
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