const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
var moment = require("moment");

// Import models
const Upload = require("../model/upload");
const Scanning = require("../model/scanning");
const { resolve } = require("path");

//use express static folder
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/upload/excel", (req, res) => {
  let body = req.body[0];
  let tender_no = body["Tender No."];
  // console.log(body);

  // Change time format
  const changeTime = (body) => {
    // body["Published Date"] = body["Published Date"].replace(/ /g, "-");
    body["Published Date"] = moment(body["Published Date"]).format(
      "YYYY-MM-DD"
    );
    body["Planned Close Date"] = moment(body["Planned Close Date"]).format(
      "YYYY-MM-DD"
    );
    body["Extended Close Date"] = moment(body["Extended Close Date"]).format(
      "YYYY-MM-DD"
    );
    body["Date of Award"] = moment(body["Date of Award"]).format("YYYY-MM-DD");
  };
  changeTime(body);

  // Change award price format
  console.log(body);
  const changeAwardPrice = (body) => {
    let awardPrice = body["Award Price"].replace(/(\r\n|\n|\r)/gm, "");
    let awardPriceArray = body["Award Price"]
      .replace(/(\r\n|\n|\r)/gm, "")
      .split(",");
    awardPriceArray.pop();
    if (awardPriceArray.length > 1) {
      body["Award Price"] = awardPrice.slice(0, -1);
    } else {
      body["Award Price"] = awardPriceArray[0];
    }
  };
  changeAwardPrice(body);

  // Add opportunity_name, tender_no, dates and total_awarded_value into opportunities table
  Upload.UploadBasicInfo(body, (error, results) => {
    if (error) {
      // "Not acceptable"
      res.status(406).send();
      return;
    }
  });

  // Scan for agency_id and add into opportunities table
  Scanning.ScanningAgency(body, (error, results) => {
    if (error || results.length == 0) {
      console.log("Agency does not exist in database");
      // "Not found"
      res.status(404).send();
      return;
    } else {
      let agency_id = results[0].agency_id;
      console.log(agency_id);
      Upload.UploadAgency(tender_no, agency_id, (error, results) => {
        if (error) {
          // "Not acceptable"
          res.status(406).send();
          return;
        }
        res.status(201).send(results);
      });
    }
  });
});

module.exports = app;
