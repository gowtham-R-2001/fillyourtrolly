import { IconButton } from "@material-ui/core"
import { Link } from "react-router-dom";
import { WishlistContext } from "./WishlistContext";

export function Profile() {
    return (
        <WishlistContext.Consumer>
        {
            (context) => {
                return (
                    <div className="profile">
                        <div className="holder-1">
                            <IconButton>
                                <div className="user">
                                    <i className = "fa fa-user" aria-hidden="true"></i>
                                    <h3>User</h3>
                                    <div className="username"> {(context.user).substring(0,(context.user).indexOf("@"))} </div>
                                </div>
                            </IconButton>
            
                            <IconButton>
                                <div className="records">
                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                    <h3>Buy records</h3>
                                    <div className="number-of-prod"> {context.buyrecords.length} </div>
                                </div>
                            </IconButton>
                        </div>

                        <div className="holder-2">
                            <Link to="/wishlist">
                                <IconButton>
                                    <div className="wishlist">
                                        <i className="fa fa-heart" aria-hidden="true"></i>
                                        <h3>Wishlist</h3>
                                        <div className="number-of-prod"> {context.wish.length} </div>
                                    </div>
                                </IconButton>
                            </Link>

                           <Link to="/login" onClick={() => {context.setUserWishList([]); context.setUserBuyRecords([]); context.setLoginStatus(false); localStorage.setItem("userDetails","")}}>
                                <IconButton>
                                    <div className="signout">
                                        <i className="fa fa-power-off" aria-hidden="true"></i>
                                        <h3>Signout</h3>
                                    </div>
                                </IconButton>
                           </Link>
                        </div>
                    </div>
                );
            }
        }
        </WishlistContext.Consumer>
    );
}