import Axios from "axios";

export const checkIsUser = (user) => {
    let checkPromise = new Promise((resolve, reject) => {
      Axios.post(`http://localhost:9000/isuser/?user=${user.email}`)
          .then((response) => resolve(response))
          .catch((err) => reject(err))
    });
    return checkPromise;
}

export const getWishlist = (user) => {
    let wishlistPromise = new Promise((resolve, reject) => {
      Axios.post(`http://localhost:9000/getwishlist/?user=${user.email}`)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
    })
    return wishlistPromise;
}

export const getBuyRecords = (user) => {
    let buyrecordsPromise = new Promise((resolve, reject) => {
      Axios.post(`http://localhost:9000/getbuyrecords/?user=${user.email}`)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
    })
    return buyrecordsPromise;
}

// function addProductToWishDB(product) {
//     axios.post(`http://localhost:9000/wishlist/user=${}`)
//     .then(response => console.log(response))
//     .catch(err => popper("Can't add to wishlist"))
// }

// function addProductToBuyRecordsDB(product) {
//     axios.post(`http://localhost:9000/wishlist/user=${}`)
//     .then(response => console.log(response))
//     .catch(err => console.log(err))
// }