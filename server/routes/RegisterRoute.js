const express = require("express");
const router = express.Router();
const db = require("../configuser");

router.get("/", (req, res) => {
  isTable()
    .then((data) => {
      console.log(data);
      if(data && data.length > 0) {
        createUser(req.query.email, req.query.password)
            .then(async (data) => {
              let username = (req.query.email).substring(0,(req.query.email).indexOf("@"));
              await createWishList(username);
              await createBuyRecords(username);
              res.send({ status: 200, data: data })
            })
            .catch((err) => res.send({ status: 405, data: err }));   
      }
      else {
        createTableAuth()
          .then((data) => {
            createUser(req.query.email, req.query.password)
                .then(async (data) => {
                  let username = (req.query.email).substring(0,(req.query.email).indexOf("@"));
                  await createWishList(username);
                  await createBuyRecords(username);
                  res.send({ status: 200, data: data })
                }) 
                .catch((err) => res.send({ status: 405, data: err }));
          })
          .catch((err) => res.send({ status: 405, data: err }));
      }
    })
    .catch((err) => {
      res.send({ status: 404, data: err });
    });
});

function createUser(email, password) {
  let insertSql = `INSERT INTO auth(email, password) VALUES('${email}','${password}');`;
  let insertPromise = new Promise((resolve, reject) => {
    db.query(insertSql, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });

  return insertPromise;
}

function isTable() {
    let isSql = `SHOW TABLES LIKE 'auth';`;
    let isPromise = new Promise((resolve, reject) => {
        db.query(isSql, (err, res) => {
            if(err) reject(err);
            else    resolve(res);
        })
    });

    return isPromise;
}

function createTableAuth() {
  const createSql = `CREATE TABLE auth (email VARCHAR(100) PRIMARY KEY NOT NULL, password VARCHAR(50) NOT NULL)`;
  let createPromise = new Promise((resolve, reject) => {
    db.query(createSql, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });

  return createPromise;
}

function createWishList(username) {
  let createSql = `CREATE TABLE ${username}_w`+
  `(sno INT AUTO_INCREMENT PRIMARY KEY NOT NULL, `+
  `title VARCHAR(300),` +
  'imageLink VARCHAR(500),' +
  `link VARCHAR(500),` +
  `price VARCHAR(100),` +
  `starRating VARCHAR(100),` +
  `totalRating VARCHAR(100));`;
  let createPromise = new Promise((resolve, reject) => {
    db.query(createSql, (err, res) => {
      if (err) reject(err)
      else resolve(res)
    });
  });

  return createPromise;
}

function createBuyRecords(username) {
  let createSql = `CREATE TABLE ${username}_b`+
  `(sno INT AUTO_INCREMENT PRIMARY KEY NOT NULL, `+
  `title VARCHAR(300),` +
  'imageLink VARCHAR(500),' +
  `link VARCHAR(500),` +
  `price VARCHAR(100),` +
  `starRating VARCHAR(100),` +
  `totalRating VARCHAR(100));`;
  let createPromise = new Promise((resolve, reject) => {
    db.query(createSql, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });

  return createPromise;
}


module.exports = router;
