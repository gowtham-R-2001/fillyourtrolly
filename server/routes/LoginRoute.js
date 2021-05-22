const express = require("express");
const router = express.Router();
const db = require("../configuser");

router.get("/", (req, res) => {
  isUser(req.query.email, req.query.password)
    .then((data) => res.send({ status: 200, data: JSON.parse(JSON.stringify(data)) }))
    .catch((err) => res.send({ status: 404, data: err }));
});

function isUser(email, password) {
  const sql = `SELECT COUNT(*) FROM auth WHERE email='${email}' AND password='${password}';`;
  let promise = new Promise((resolve, reject) => {
    db.query(sql, (err, res) => {
      if (err) reject(err);
      else resolve(res); 
    });
  });

  return promise;
}

module.exports = router;