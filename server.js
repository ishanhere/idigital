var http = require("http");
var formidable = require("formidable");
var fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const multer = require("multer");

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
      res.send(JSON.stringify(result));
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

app.post("/api/addfestivals/", (req, res) => {
  console.log("at server");
  // console.log(req);
  let festivals = {
    fname: req.body.festival,
    keywords: req.body.keywords,
    displaypicturepath: req.body.logoFile
  };
  // console.log(req.body.festival, req.body.keywords);
  let sql = "INSERT INTO tblfestival SET ?";
  let query = con.query(sql, festivals, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.body = "success";
    res.send(JSON.stringify(result));
  });
}); // INM 10-06-2019)

app.get("/api/showimagesbyfestival", (req, res) => {
  // console.log("server" + req.query.id);
  let sql = `SELECT * FROM tblfest_images WHERE festid=${req.query.id}`;
  // console.log(sql);
  con.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send({ express: result });
  });
}); // INM 11-06-2019

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Admin/public/upload/");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).array("myfile");

app.post("/api/uploadfestivalimages", function(req, res) {
  console.log(req.query.fid);
  upload(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    for (var i = 0; i < req.files.length; i++) {
      let festivalimgs = {
        path: req.files[i].filename,
        festid: req.query.fid,
        is_sharable: 1
      };
      let sql = "INSERT INTO tblfest_images SET ?";
      let query = con.query(sql, festivalimgs, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.body = "success";
      });
    }
    res.end("File is uploaded successfully!");
  });
}); // INM 15-06-2019
app.post("/uploadfestivaldisplayimage", function(req, res) {
  console.log(req.logoFile);
  upload(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded successfully!");
  });
}); // INM 17-06-2019

app.listen(port, () => console.log(`Listening on port ${port}`));
