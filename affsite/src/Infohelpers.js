import Axios from "axios";
import { popper } from "./helpers/popper";

export const checkIsUser = (user) => {
  console.log("Inside get check user");
    let checkPromise = new Promise((resolve, reject) => {
      Axios.post(`http://localhost:9000/isuser/?user=${user}`)
          .then((response) => resolve(response))
          .catch((err) => reject(err))
    });
    return checkPromise;
}

export const getWishlist = (user) => {
    console.log("Inside get wishlist");
    let wishlistPromise = new Promise((resolve, reject) => {
      Axios.post(`http://localhost:9000/getwishlist/?user=${user}`)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
    })
    return wishlistPromise;
}

export const getBuyRecords = (user) => {
  console.log("Inside get buy records");
    let buyrecordsPromise = new Promise((resolve, reject) => {
      Axios.post(`http://localhost:9000/getbuyrecords/?user=${user}`)
      .then((response) => resolve(response))
      .catch((err) => reject(err)) 
    })
    return buyrecordsPromise;
}

export function addProductToWishDB(user, product) {
    Axios.post(`http://localhost:9000/addtowishlist/?user=${user}`, product)
    .then(response => {console.log(response)})
    .catch(err => popper("Can't add to wishlist"))
}

export function addProductToBuyRecordsDB(user, product) {
    Axios.post(`http://localhost:9000/addtobuyrecords/?user=${user}`, product)
    .then(response => console.log(response))
    .catch(err => console.log(err))
}