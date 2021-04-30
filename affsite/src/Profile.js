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
                                    <div className="username"> {"gowthamcool4ever"} </div>
                                </div>
                            </IconButton>
            
                            <IconButton>
                                <div className="records">
                                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                    <h3>Buy records</h3>
                                    <div className="number-of-prod"> 10 </div>
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
            
                           <IconButton>
                            <div className="signout">
                                    <i className="fa fa-power-off" aria-hidden="true"></i>
                                    <h3>Signout</h3>
                                </div>
                           </IconButton>
                        </div>
                    </div>
            
                );
            }
        }
        </WishlistContext.Consumer>
    );
}