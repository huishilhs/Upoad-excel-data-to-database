const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import models
const Upload = require("../model/upload");
const Scanning = require("../model/scanning");

//use express static folder
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/upload/excel", (req, res) => {
  console.log(req.body);
  Scanning.ScanningAgency(req.body, (error, results) => {
    if (error) {
      res.status(500).send();
      return;
    }
    // res.status(200).send(results);
    if (results.length === 0) {
      console.log("Agency does not exist in database");
    }
    if (results[0].agency_id != NaN) {
      console.log(results[0].agency_id);
    }
  });
});

module.exports = app;
