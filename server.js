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

var storage1 = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Admin/public/files/");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload1 = multer({ storage: storage1 }).single("myfile");

app.post("/upload", function(req, res) {
  console.log(req.logoFile + " from server.js");
  upload1(req, res, function(err) {
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

app.post("/api/addFestImage/", (req, res) => {
  console.log("at server");
  // console.log(req);
  let festivals = {
    path: req.body.path,
    festid: req.body.festid,
    is_sharable: 1
  };
  // console.log(req.body.festival, req.body.keywords);
  let sql = "INSERT INTO tblfest_images SET ?";
  let query = con.query(sql, festivals, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.body = "success";
    res.send(JSON.stringify(result));
  });
}); //24-06-2019 KillerGod

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

app.get("/api/showimages", (req, res) => {
  // console.log("server" + req.query.id);
  let sql = `SELECT fi.* from tblfest_images as fi inner join tblfestival as f on f.fid = fi.festid where f.keywords like "%${
    req.query.keyword
  }%"`;
  // console.log(sql);
  con.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send({ express: result });
  });
}); //22-06-2019 KILLERGOD

var storage2 = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Admin/public/upload/");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload2 = multer({ storage: storage2 }).array("myfile");

app.post("/api/uploadfestivalimages", function(req, res) {
  console.log(req.query.fid);
  upload2(req, res, function(err) {
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
  upload2(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded successfully!");
  });
}); // INM 17-06-2019

var storage4 = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Admin/public/template_pic/");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
}); // 25-06-2019 KILLERGOD
var upload4 = multer({ storage: storage4 }).single("myfile"); // 25-06-2019 KILLERGOD

app.post("/uploadTemplate", function(req, res) {
  // console.log(req);
  upload4(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded successfully!");
  });
}); // 25-06-2019 KILLERGOD

app.post("/api/addTemplate/", (req, res) => {
  console.log("at server");
  // console.log(req);
  let festivals = {
    code: req.body.code,
    src: req.body.src
  };
  // console.log(req.body.festival, req.body.keywords);
  let sql = "INSERT INTO tbltemplate SET ?";
  let query = con.query(sql, festivals, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.body = "success";
    res.send(JSON.stringify(result));
  });
}); //25-06-2019 KillerGod

app.get("/api/showtemplate", (req, res) => {
  // console.log("server" + req.query.id);
  let sql = `SELECT * FROM tbltemplate`;
  // console.log(sql);
  con.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send({ express: result });
  });
}); //22-06-2019 KILLERGOD

var storage3 = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./Admin/public/final_pic/");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
}); // 29-06-2019 KILLERGOD
var upload3 = multer({ storage: storage3 }).single("myfile"); // 29-06-2019 KILLERGOD

app.post("/uploadFinalImage", function(req, res) {
  // console.log(req);
  upload3(req, res, function(err) {
    if (err) {
      console.log(err);
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded successfully!");
  });
}); // 29-06-2019 KILLERGOD

app.post("/api/addFinalImage/", (req, res) => {
  console.log("at server");
  console.log(req.body.path);
  let festivals = {
    path: req.body.path
  };
  // console.log(req.body.festival, req.body.keywords);
  let sql = "INSERT INTO tblfinal_image SET ?";
  let query = con.query(sql, festivals, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.body = "success";
    res.send(JSON.stringify(result));
  });
}); //29-06-2019 KillerGod
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

app.post("/search/festivals", (req, res) => {
  let fest = req.body.keyword1;
  console.log(fest);
  let sql =
    "SELECT * from tblfestival where fname like '%" +
    fest +
    "%' or keywords like '%" +
    fest +
    "%'";
  console.log(sql);
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.send();
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
