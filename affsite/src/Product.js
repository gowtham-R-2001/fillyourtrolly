import Button from "@material-ui/core/Button";
import Axios from "axios";
import { ImageLoader } from "./helpers/ImageLoader"
import { popper } from "./helpers/popper";
import { WishlistContext } from "./WishlistContext";

function isAlreadyPresent(wishes, prod) {
    let result = false;
    for(let i = 0; i < wishes.length; i++)
        if(JSON.stringify(wishes[i]) === JSON.stringify(prod)) {
            result = !result;
            break;
        }

    return result;
}

export function Product(props) {
    let imageArr = ["one_star.png","two_star.png","three_star.png","four_star.png","five_star.png"];

    let img = imageArr[parseInt(props.rating.split(" ")[0]) - 1];
    let index = parseInt(props.rating.split(" ")[0]);
    let height = 0;
    let width = 0;
    if(index === 1) {height = 40; width = 25}
    else if(index === 2) {height = 40; width = 45}
    else if(index === 3) {height = 40; width = 70}
    else if(index === 4) {height = 40; width = 80}
    else {height = 40; width = 90}

    return (
        <WishlistContext.Consumer>
            {
                (context) => {
                    return (<div className="product">
                        <div className="product-details">
                            <ImageLoader src={props.imgLink} />
                            <div className="item">
                                <span className="product-title"> {props.title} </span>

                                <div className="price-holder">
                                    <i className="fa fa-rupee"></i>
                                    <span className="product-price"> {props.price} </span>
                                </div>

                                <div className="rating-holder-parent">
                                    <div className="rating-holder">
                                        <img className="product-rating" style={{height: `${height}px`, width: `${width}px`}}  src={`/${img}`} />
                                    </div>
                                </div>

                                <div className="total-rating-holder">
                                    <i className="fa fa-user" style={{transform: "scale(0.8)"}}></i>
                                    <span className="product-total-rating"> {props.totalRating} </span>
                                </div>
                            </div>

                            {
                                props.contType === "product-comp" && 
                                <div className="button-holder">
                                    <Button
                                        id="buy-now-btn"
                                        variant="contained"
                                        size="medium"
                                        color="primary"
                                        onClick={() => window.open("https://amazon.in/"+props.link)}
                                    >
                                        {props.button1}
                                    </Button>

                                    <Button
                                        id="add-to-wishist-btn"
                                        onClick={(e) => {
                                            if(context.loginStatus === true)
                                            {
                                                let result = isAlreadyPresent(context.wish, props);
                                                if(result === false) context.wish.push(props);
                                                e.target.innerHTML = "Added&nbsp;<i class='fa fa-heart'> </i>";
                                            }
                                            else
                                                popper("Please login to add in wishlist");
                                        }}
                                        variant="contained"
                                        size="medium"
                                        color="primary"
                                        style={{background: "#FF7171", color: "#FFF"}}
                                    >
                                        {props.button2}
                                    </Button>
                                </div>
                            }

                            {
                                props.contType === "wishlist-comp" && 
                                <div className="button-holder">
                                    <Button
                                        id="buy-now-btn"
                                        variant="contained"
                                        size="medium"
                                        color="primary"
                                    >
                                        {props.button1}
                                    </Button>

                                    <Button
                                        id="remove-btn"
                                        variant="contained"
                                        size="medium"
                                        color="primary"
                                        style={{background: "#FF7171", color: "#FFF"}}
                                    >
                                        {props.button2}
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>);
                }
            }
        </WishlistContext.Consumer>
    );
}