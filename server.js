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
