const express = require("express");
const router = express.Router();
const db = require("../configuser");

router.post("/",(req, res) => {
    console.log("INSide");
    isUser(req.query.user)
    .then((data) => {console.log("data",data); res.send({ data: ((JSON.parse(JSON.stringify(data)))[0]['COUNT(*)'] > 0) ? true : false })})
    .catch((err) => {console.log(err); res.send({ data: false,  })});
});

function isUser(email) {
    const sql = `SELECT COUNT(*) FROM auth WHERE email='${email}';`;
    console.log(sql); 
    let promise = new Promise((resolve, reject) => {
      db.query(sql, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  
    return promise;
}


module.exports = router;