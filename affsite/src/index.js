import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { WishlistContext } from "./WishlistContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(<Router> <WishlistContext.Provider value={{user: "", wish: []}}> <App /> </WishlistContext.Provider> </Router>,document.getElementById("root"));