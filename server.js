const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const port = process.env.PORT || 5000;
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "idigital_db"
});
con.connect(err => {
  if (err) throw err;
  console.log("Connected here!");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/listfestivals", (req, res) => {
  let sql = "SELECT * FROM tblfestival";
  con.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send({ express: result });
  });
}); // INM 10-06-2019

app.post("/api/addfestivals", (req, res) => {
  console.log("lodo");
  console.log(req);
  let festivals = {
    fname: req.body.festival,
    keywords: req.body.keywords
  };
  let sql = "INSERT INTO tblfestival SET ?";
  let query = con.query(sql, festivals, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.body = "success";
    res.send(JSON.stringify(result));
  });
}); // INM 10-06-2019)

app.get("/api/showimagesbyfestival", (req, res) => {
  // let festivalid = {
  //   fid: req.body.fid
  // };
  let sql = `SELECT * FROM tblfest_images WHERE festid='${
    req.body.festivalid
  }'`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(query);
    res.send({ express: result });
  });
}); // INM 10-06-2019

app.listen(port, () => console.log(`Listening on port ${port}`));
