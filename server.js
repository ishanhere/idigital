var http = require("http");
var formidable = require("formidable");
var fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

var multer = require("multer");

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
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, newpath);
  },
  filename: function(req, file, cb) {
    cb(null, oldpath + "-" + Date.now());
  }
});

var upload = multer({ storage: storage });
app.post("/add/company", upload.single("pic"), (req, res, next) => {
  console.log("Helo");

  var oldpath = req.body.logoFile;

  var newpath = "E:/idigital/Admin/public/files/" + oldpath;
  console.log(newpath);
  console.log(oldpath);

  upload.single("pic");

  fs.rename(oldpath, newpath, function(err) {
    if (err) throw err;
    res.write("File uploaded and moved!");
    res.end();
  });

  let company = {
    cname: req.body.company,
    email: req.body.email,
    password: req.body.cpwd,
    tagline: req.body.tagline,
    personname: req.body.pname,
    phone: req.body.phone,
    address: req.body.address,
    logo: req.body.logoFile,
    is_active: "0",
    is_verified: "0"
  };
  let sql = "INSERT INTO tblcompany SET ?";

  let query = con.query(sql, company, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

app.get("/list/company", (req, res) => {
  let sql = "SELECT * from tblcompany";
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send({ express: result });
  });
});

var val;
var set = 0;
var todo;
app.post("/edit/company", (req, res) => {
  let comid = req.body.comid;

  let sql = "SELECT is_active from tblcompany where cid='" + comid + "'";
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    val = result[0].is_active;
    if (val == 0) todo = 1;
    else todo = 0;

    let sql1 =
      "UPDATE tblcompany SET is_active = '" +
      todo +
      "' where cid=" +
      comid +
      "";
    console.log(sql1);
    let query1 = con.query(sql1, (err, result) => {
      if (err) throw err;
      console.log(result);
      // res.send(JSON.stringify(result));
    });
  });

  //
});
app.listen(port, () => console.log(`Listening on port ${port}`));
