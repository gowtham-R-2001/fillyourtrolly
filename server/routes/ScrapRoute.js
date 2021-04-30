const express = require("express");
const router = express.Router();
const puppeteer = require('puppeteer');
const db = require("../config.js");

router.post("/:item", async (req,res) => {
  let item = req.params.item;

  scrapData(item)
    .then(products => {
      console.log("Scraped");
      createTable(item)
        .then(data => {
          console.log("Table creation Success");
          let count = 0;
          products.forEach(async (product) => {
            await insertData(product, item);
            console.log("insertion success " + count);
            count++;
          })
          res.send(data);
        })
        .catch(err => res.send(err))
    })
    .catch(err => res.send(err));
});


async function scrapData(item)
{
  let data = null;
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });
    console.log("\n\nBrowser started");
    let page = await browser.newPage();

    console.log("New page opened");
    await page.goto("https://www.amazon.in/");

    console.log(`Trying to scrap ${item}..`);
    await page.focus("#twotabsearchtextbox");
    await page.keyboard.type(item);
    console.log("Searching data");
    await page.click("#nav-search-submit-button");
    await page.waitForNavigation({ waitUntil: "load" });
    await page.waitForSelector(".a-last", { timeout: "30000" });

    data = await page.evaluate(async () => {
      const timer = (ms) => new Promise((res) => setTimeout(res, ms));
      let cnt = 0,
        flg = 0,
        pages = 0;
      let content = [];

      while (true) {
        if (document.querySelector("li.a-last a")) {
          document
            .querySelectorAll(".s-include-content-margin.s-latency-cf-section")
            .forEach(async (data) => {
              let product = {
                starRating: data.querySelector("i span")
                  ? data.querySelector("i span").textContent
                  : "",
                price: data.querySelector(".a-price-whole")
                  ? data.querySelector(".a-price-whole").textContent.trim()
                  : 0,
                link: data.querySelector("a.a-link-normal.a-text-normal")
                  ? data
                      .querySelector("a.a-link-normal.a-text-normal")
                      .getAttribute("href")
                  : "",
                imageLink: data.querySelector("img")
                  ? data.querySelector("img").getAttribute("src")
                  : "",
                title: data.querySelector("h2")
                  ? data.querySelector("h2").textContent.trim()
                  : "",
                totalRating: data.querySelector("span.a-size-base")
                  ? data.querySelector("span.a-size-base").textContent
                  : "",
              };
              await timer(500);
              if(data.querySelector("i span"))
                content.push(product);
            });
          document.querySelector("li.a-last a").click();
          pages++;
          cnt = 0;
        } else cnt++;

        if (cnt == 5) flg = 1;
        if (flg == 1) return { pages: pages, content: content };
        await timer(1000);
      }
    });

    console.log("Got the content");
    setTimeout(async () => {
      await browser.close();
    }, 4000);
  } catch (err) {
    console.log(err);
    await browser.close();
  }
  console.log(data.content.length);
  return data.content;
}



async function createTable(item) {
  let createSql = `CREATE TABLE _${item}`+
  `(sno INT AUTO_INCREMENT PRIMARY KEY NOT NULL, `+
  `title VARCHAR(300),` +
  'imageLink VARCHAR(500),' +
  `link VARCHAR(500),` +
  `price VARCHAR(100),` +
  `starRating VARCHAR(100),` +
  `totalRating VARCHAR(100));`;

  let Createpromise = new Promise((resolve, reject) => {
    db.query(createSql, (err, res) => {
      if(err) reject(err);
      else    resolve(res);
    });
  });

  return Createpromise;
}




async function insertData(product, item) {
  let replaceAll = (str, find, replace) => {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
  }

  let insertSql = `INSERT INTO _${item} (title, imageLink, link, price, starRating, totalRating) VALUES (` +
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