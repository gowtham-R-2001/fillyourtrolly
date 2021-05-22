import { ImageLoader } from "./helpers/ImageLoader";
import Button from "@material-ui/core/Button";
import { WishlistContext } from "./WishlistContext";
import { addProductToWishDB } from "./Infohelpers";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function isAlreadyPresent(wishes, prod) {
    for(let i = 0; i < wishes.length; i++)
        if(wishes[i].title === prod.title)
            return true;

    return false;
}

export function HomeProducts(props) {
    let imageArr = ["one_star.png","two_star.png","three_star.png","four_star.png","five_star.png"];

    let img = imageArr[parseInt(props.starRating.split(" ")[0]) - 1];
    let index = parseInt(props.starRating.split(" ")[0]);
    let height = 0;
    let width = 0;
    if(index === 1) {height = 40; width = 25}
    else if(index === 2) {height = 40; width = 45}
    else if(index === 3) {height = 40; width = 70}
    else if(index === 4) {height = 40; width = 80}
    else {height = 40; width = 90}

    const [name, setName] = useState(<>{"Add "}&nbsp;<i className="fa fa-heart"></i></>);
    const wishcontext = useContext(WishlistContext);

    useEffect(() => {
        isAlreadyPresent(wishcontext.wish, props) ? setName(<>{"Added"}&nbsp;<i className="fa fa-heart"></i></>) : setName(<>{"Add "}&nbsp;<i className="fa fa-heart"></i></>);
    },[]);

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    return (
        <div className="home-product">
            <ImageLoader src={props.imageLink} />
            <img className="product-star-rating" src={img} style={{height: `${height}px`, width: `${width}px`}} />
            <div className="price-holder">
                <i className="fa fa-rupee"></i><span className="product-price"> {props.price} </span>
            </div>
            <WishlistContext.Consumer>
                {
                    (context) => {
                        return (
                            <div className="button-login-holder">
                                <Button
                                    className="add-to-wishist-btn"
                                    variant="contained"
                                    size="medium"
                                    color="primary"
                                    onClick={(e) => {
                                        if(context.loginStatus)
                                        {
                                            let result = isAlreadyPresent(context.wish, props);
                                            if(result === false)
                                            {
                                                context.wish.push(props);
                                                e.target.innerHTML = "Added&nbsp;<i class='fa fa-heart'> </i>";
                                                addProductToWishDB(context.user, props);
                                            }
                                        }
                                        else 
                                        {
                                            setShowLoginPopup(true);
                                            setTimeout(() => setShowLoginPopup(false), 3500);
                                        }
                                    }}
                                    style={{background: "#FF7171", color: "#FFF"}}
                                >
                                    {name}
                                </Button>

                                { 
                                    showLoginPopup && <div className="login-popup-holder">
                                        <div className="login-popup">
                                            <div className="square"></div>
                                            <div className="login-popup-msg"> 
                                                <Link style={{color: "#000"}} to="/login">Login to <br /> continue </Link> 
                                            </div>
                                            <div className="arrow"></div>
                                        </div>
                                    </div>
                                }
                            </div>
                        );
                    }
                }
            </WishlistContext.Consumer>
        </div>
    );
}