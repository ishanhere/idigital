var http = require("http");
var formidable = require("formidable");
var fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

const path = require("path");

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

// const storage = './Admin/public/files';

// const storage = multer.diskStorage({
//   destination: "",
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Admin/public/files/");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).single("myfile");

app.post("/upload", function(req, res) {
  console.log(req.logoFile);
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded successfully!");
  });
});

app.post("/add/company", (req, res, next) => {
  let company = {
    cname: req.body.company,
    email: req.body.email,
    password: req.body.cpwd,
    tagline: req.body.tagline,
    personname: req.body.pname,
    phone: req.body.phone,
    address: req.body.address,
    // logo: req.body.logoFile.name,
    logo: req.body.logoFile,
    is_active: "0",
    is_verified: "0"
  };
  console.log(company);
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
    // console.log(result);
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

app.get("/api/listfestivals", (req, res) => {
  let sql = "SELECT * FROM tblfestival";
  con.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send({ express: result });
  });
}); // INM 10-06-2019

app.post("/api/addfestivals", (req, res) => {
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
    // console.log(query);
    res.send({ express: result });
  });
}); // INM 10-06-2019

app.post("/search/company", (req, res) => {
  let word = req.body.keyword;

  let sql =
    "SELECT * from tblcompany where cname like '%" +
    word +
    "%' or email like '%" +
    word +
    "%' or personname like '%" +
    word +
    "%'or phone like '%" +
    word +
    "%' or address like '%" +
    word +
    "%'";
  console.log(sql);
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(query);
    res.send({ express: result });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
