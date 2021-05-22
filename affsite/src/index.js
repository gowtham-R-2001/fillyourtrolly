import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { WishlistContext } from "./WishlistContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(<Router> <WishlistContext.Provider value={{
        user: "", 
        setUsername: "", 
        wish: [], 
        buyrecords: [],
        setUserWishList: function(){return null}, 
        setUserBuyRecords: function(){return null},
        loginStatus: false, 
        setLoginStatus: function(){return null},
        topdealsProducts: [],
        newarrivalsProducts: [],
        productDisplayProducts: [],
        commonDisplayProducts: []
    }}> <App /> </WishlistContext.Provider> </Router>
    ,
    document.getElementById("root"));