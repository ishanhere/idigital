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
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
