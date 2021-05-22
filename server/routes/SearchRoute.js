const express = require('express');
const router = express.Router();
const db = require("../config.js");
const stringSimilarity = require('string-similarity');

router.get("/:item",(req,res) => {
    let item = req.params.item;
    isPresent(item)
        .then(response => {
            if (response.rating > 0) {
                console.log('Already in database.');
                let content = null;
                getContent(response.table)
                    .then(data => {res.send(JSON.parse(JSON.stringify(data)))})
                    .catch(err => {console.log(err); res.send(content)});
            }
            else {
              res.send({});
            }
        })
        .catch(err => res.send(err))
});

function isPresent(item) {
  let checkSql = `SHOW TABLES;`;
  let promise = new Promise((resolve, reject) => {
    db.query(checkSql, (err, res) => {
      if (err) reject({ data: err });
      else {
        let data = JSON.parse(JSON.stringify(res));
        let arr = [];
        data.forEach((table) => {
          arr.push(table["Tables_in_fillyourtrolly"].substring(1));
        });
        console.log(arr);
        var matches = stringSimilarity.findBestMatch(item, arr);
        console.log(matches);
        resolve({ data: res, table: matches['bestMatch']['target'], rating: matches['bestMatch']['rating'] });
      }
    });
  });

  return promise;
}

async function getContent(item) {
  let readSql = `SELECT * FROM _${item} WHERE 1;`;
  let readPromise = new Promise((resolve, reject) => {
    db.query(readSql,(err,res,fields) => {
      if(err) reject(err);
      else resolve(res);
    });
  });

  return readPromise;
}

module.exports = router;