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
  // Function to add agencies
  const agencyUpload = (body, i) => {
    Scanning.ScanningAgency(body, (error, results) => {
      // res.status(200).send(results);
      if (error || results.length == 0) {
        console.log("Agency does not exist in database");
        // "Not found"
        res.status(404).send();
        return;
      } else {
        let agency_id = results[0].agency_id;
        Upload.UploadAgency(body, agency_id, (error, results) => {
          if (error) {
            // "Not acceptable"
            res.status(406).send();
            return;
          } // "Created"
          res.status(201).send(results);
        });
      }
    });
  };

  let body = req.body;
  for (i = 0; i < body.length; i++) {
    // console.log(body[i]);
    agencyUpload(body[i]);
  }
});

module.exports = app;
