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
    let getBuyListSql = `SELECT * FROM ${user}_b WHERE 1;`;
    let getPromise = new Promise((resolve, reject) => {
        db.query(getBuyListSql,(err, res) => {
            if(err) reject(err);
            else    resolve(res);
        });
    })
    return getPromise;
}

module.exports = router;