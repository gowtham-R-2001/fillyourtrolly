const express = require('express')
const router = express.Router();
const db = require("../configuser");

router.post("/",(req,res) => {
    let user = (req.query.user).substring(0, (req.query.user).indexOf("@"));
    let product = req.body;
    insertData(product, user)
        .then(response => res.send(response))
        .catch(err => res.send(err));
})

async function insertData(product, user) {
    let replaceAll = (str, find, replace) => {
      var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      return str.replace(new RegExp(escapedFind, 'g'), replace);
    }

    let insertSql = `INSERT INTO ${user}_w (title, imageLink, link, price, starRating, totalRating) VALUES (` +
    `"${replaceAll(product.title,"\"","") }",` +
    `"${product.imageLink}",` +
    `"${product.link}",` +
    `"${product.price}",` +
    `"${product.starRating}",` +
    `"${product.totalRating} ");`;

    let insertPromise = new Promise((resolve, reject) => {
      db.query(insertSql, (err, res) => {
        if(err)
        {
          reject(err);
          console.log(err);
        }
        else {
          resolve(res);
        }
      });
    })
    return insertPromise;
  }

module.exports = router;