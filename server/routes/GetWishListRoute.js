const express = require('express')
const router = express.Router();
const db = require("../configuser");

router.post("/",(req,res) => {
    let user = (req.query.user).substring(0, (req.query.user).indexOf("@"));
    getData(user)
        .then(response => {console.log(response); res.send(response)})
        .catch(err => {console.log(err); res.send(err)})
})

function getData(user) {
    let getWishListSql = `SELECT * FROM ${user}_w WHERE 1;`;
    let getPromise = new Promise((resolve, reject) => {
        db.query(getWishListSql,(err, res) => {
            if(err) {console.log(err); reject(err)}
            else   {console.log(res); resolve(res)}
        });
    }) 
    return getPromise;
}

module.exports = router;