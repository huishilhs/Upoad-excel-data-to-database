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
   let count = 0; 
  for (let i = 0; i < req.body.length; i++) {
  let TenderNo = req.body[i].TenderNo;
  let AccountLevel = req.body[i].AccountLevel;
  let ParentAgency = req.body[i].ParentAgency;
  let Agency = req.body[i].Agency;
  let PublishedDate = req.body[i].PublishedDate;
  let PlannedCloseDate = req.body[i].PlannedCloseDate;
  let ExtendedCloseDate = req.body[i].ExtendedCloseDate;
  
  var insertData = `INSERT INTO upload (TenderNo, AccountLevel, ParentAgency, Agency, PublishedDate, PlannedCloseDate, ExtendedCloseDate) 
                      VALUES ('${TenderNo}', '${AccountLevel}', "${ParentAgency}"	, "${Agency}",	"${PublishedDate}", "${PlannedCloseDate}"	, "${ExtendedCloseDate}")
                      ;`;

  db.query(insertData, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(500);
      return;
    }
    console.log("file uploaded");
    count++;
    });
  }
 res.status(200).send(count.toString());
 return;
});


//create connection
const PORT = process.env.PORT || 8081;
const hostname = "localhost";
app.listen(PORT, () =>
  console.log(`Server started and accessible via http://${hostname}:${PORT}`)
);
