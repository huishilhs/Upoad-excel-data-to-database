const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");


//use express static folder
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2129330",
  database: "user_upload",
});

db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});



app.post("/upload/excel", (req, res) => {
  let TenderNo = req.body.TenderNo;
  let AccountLevel = req.body.AccountLevel;
  let ParentAgency = req.body.ParentAgency;
  let Agency = req.body.Agency;
  let PublishedDate = req.body.PublishedDate;
  let PlannedCloseDate = req.body.PlannedCloseDate;
  let ExtendedCloseDate = req.body.ExtendedCloseDate;

  var insertData = `INSERT INTO upload (TenderNo, AccountLevel, ParentAgency, Agency, PublishedDate, PlannedCloseDate, ExtendedCloseDate) 
                      VALUES ('${TenderNo}', '${AccountLevel}', "${ParentAgency}"	, "${Agency}",	"${PublishedDate}", "${PlannedCloseDate}"	, "${ExtendedCloseDate}")
                      ;`;

  db.query(insertData, (err, result) => {
    if (err) throw err;
    console.log("file uploaded");
    res.status(200).send(result);
  });
});

//create connection
const PORT = process.env.PORT || 8081;
const hostname = "localhost";
app.listen(PORT, () =>
  console.log(`Server started and accessible via http://${hostname}:${PORT}`)
);
