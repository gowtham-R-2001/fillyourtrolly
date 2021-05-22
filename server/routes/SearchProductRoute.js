const express = require('express');
const router = express.Router();
const db = require("../config.js");

router.post('/:item',(req, res) => {
    let item = req.params.item;
    let products = [];

    getTables()
        .then(tables => {
            return getProducts(tables, item)
        })
        .then((response) => {
            res.send(response);
        })
        .catch(error => {res.send(error)});
});

async function getProducts(tables, item) {
    return (new Promise(async (resolve, reject) => {
        let products = [];
        for(let i = 0; i < tables.length; i++) {
            let result = await searchTable(tables[i]["Tables_in_fillyourtrolly"], item);

            if(result.length > 0)
                products.push(...JSON.parse(JSON.stringify(result)));
            if(i === tables.length-1)
                resolve(products);
        }
    }));
}

async function searchTable(tablename, item) {
    let readSql = `SELECT * FROM ${tablename} WHERE LOWER(title) LIKE "%${item}%"`;
    let readPromise = new Promise((resolve, reject) => {
        db.query(readSql,(err,res,fields) => {
            if(err) reject(err);
            else resolve(res);
        });
    });

    return readPromise;
}

async function getTables() {
  let sql = "SHOW TABLES;";
  let promise = new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
        if(err) reject(err);
        else resolve(res);
    })
  });

  return promise;
}

module.exports = router;