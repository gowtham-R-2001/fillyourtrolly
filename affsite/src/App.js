import "./App.scss";
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Login } from "./Login";
import { Register } from "./Register";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { NotFound } from "./NotFound";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Titlebar } from "./Titlebar";
import { Profile } from "./Profile";
import { Wishlist } from "./Wishlist";
import { Search } from "./Search";
import { CommonProduct } from "./CommonProduct";
import { ProductDisplay } from "./ProductDisplay";
import { Admin } from "./Admin";
import { useEffect, useState } from "react";
import { Loader } from "./helpers/Loader";
import { WishlistContext } from "./WishlistContext";
import { checkIsUser, getWishlist, getBuyRecords } from "./Infohelpers";

let count = 0;

function App() {
  const location = useLocation();
  const [isUser, setIsUser] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [userWishlist, setUserWishList] = useState([]);
  const [userBuyRecords, setUserBuyRecords] = useState([]);
  let user = null;

  useEffect(() => {
    count++;
  })

  if(isLoaded)
    window.addEventListener("resize", () => {
      if (window.innerWidth < 400)
        document.querySelector(".titlebar h2").textContent = "FYT";
      else
        document.querySelector(".titlebar h2").textContent = "Fill Your Trolly";
    });

  useEffect(() => {
    try {
        user = localStorage.getItem("userDetails")
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;
    }
    catch(err) {
      user = null;
      setIsUser(false);
      setIsLoaded(true);
      return;
    }

    if(user) {
      checkIsUser(user.email)
        .then(response => {
          console.log(response);
          response.data.data ? setIsUser(true) : setIsUser(false);
          setIsLoaded(true);
          setUsername(user.email)
          return getWishlist(user.email);
        })
        .then(response => {
          if(response.data.length > 0)
            setUserWishList(response.data);
          return getBuyRecords(user.email);
        })
        .then(response => {
          if(response.data.length > 0)
            setUserBuyRecords(response.data);
        })
        .catch(err => {
          setIsUser(false);
          setIsLoaded(true);
          console.log(err);
        });
    }
    else {
      setIsUser(false);
      setIsLoaded(true);
    }
  }, []);

  return (
    <WishlistContext.Consumer>
      {
        (context) => {
          context.loginStatus = isUser;
          context.setLoginStatus = setIsUser;
          context.user = username;
          context.wish = userWishlist;
          context.buyrecords = userBuyRecords;
          context.setUsername = setUsername;
          context.setUserWishList = setUserWishList;
          context.setUserBuyRecords = setUserBuyRecords;

          return (
            !isLoaded 
            ? 
            <div className="App" style={{display: "flex", alignItems: "center", justifyContent: "center"}}> <Loader height="20%" width="20%" type="load" /> </div>
            :
           <div className="App">
              <div className="div-1">
                <Titlebar />
              </div>
              <div className="div-2">
                <Navbar />
              </div>
              <div className="div-3">
                <Search />
              </div>
              <TransitionGroup>
                <CSSTransition timeout={200} classNames="fade" key={location.pathname}>
                  <div className="div-4">
                    <Switch location={location}>
                      <Route exact path="/login">
                        {isUser ? <Redirect to="/profile" /> : <Login />}
                      </Route>

                      <Route exact path="/register">
                        {isUser ? <Redirect to="/profile" /> : <Register />}
                      </Route>

                      <Route exact path="/profile">
                        {isUser ? <Profile /> : <Redirect to="/login" />}
                      </Route>

                      <Route exact path="/wishlist" component={Wishlist} />

                      <Route
                        exact
                        path="/commonproduct/:item/:filter"
                        component={CommonProduct}
                      />
                      <Route exact path="/commonproduct/:item" component={CommonProduct} />

                      <Route
                        exact
                        path="/search/:item/:filter"
                        component={ProductDisplay}
                      />
                      <Route exact path="/search/:item" component={ProductDisplay} />

                      <Route exact path="/admin" component={Admin} />
                      <Route exact path="/" component={Home} />
                      <Route component={NotFound} />
                    </Switch>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          )
        }
      }
      </WishlistContext.Consumer>
  );
}

export default App;
