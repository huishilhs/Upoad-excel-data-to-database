const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
var moment = require("moment");

// Import models
const Upload = require("../model/upload");
const Retrieve = require("../model/retrieving");
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

  // Change offer validity duration format
  const changeOfferDuration = (body) => {
    let offerDuration = body["Offer Validity Duration (Days)"];
    body["Offer Validity Duration (Days)"] = offerDuration.replace("Days", "");
  };
  changeOfferDuration(body);

  // Change award price format
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

  // Change supply head format
  const changeSupplyHead = (body) => {
    let offerDuration = body["Supply Head"];
    body["Supply Head"] = offerDuration.split(" - ");
  };
  changeSupplyHead(body);

  // Insert opportunity_name, tender_no, dates and total_awarded_value into opportunities table
  console.log(
    "Inserting opportunity name, tender no, published, closed, extended, offer valid days, awarded date and total awarded value "
  );
  Upload.UploadBasicInfo(body, (error, results) => {
    if (error) {
      // "Not acceptable"
      res.status(406).send();
      return;
    }
    console.log("(1/) Basic upload success");
  });

  // Scan for agency_id and add update opportunities table
  console.log("Retrieving agency_id");
  Retrieve.Agency(body, (error, results) => {
    if (error || results.length == 0) {
      console.log("Agency does not exist in database");
      // "Not found"
      res.status(404).send();
      return;
    } else {
      console.log("agency_id successfully retrieved");
      let agency_id = results[0].agency_id;
      Upload.UploadAgency(tender_no, agency_id, (error, results) => {
        if (error) {
          // "Not acceptable"
          res.status(406).send();
          return;
        }
        console.log("(2/) agency_id insert success");
      });
    }
  });

  // Scan for procurement_type_id and update into opportunities table
  console.log("Retrieving procurement_type_id");
  Retrieve.ProcurementType(body, (error, results) => {
    if (error || results.length == 0) {
      console.log("Procurement type does not exist in database");
      // "Not found"
      res.status(404).send();
      return;
    } else {
      console.log("procurement_type_id successfully retrieved");
      let procurement_type_id = results[0].procurement_type_id;
      Upload.UploadProcurementType(
        tender_no,
        procurement_type_id,
        (error, results) => {
          if (error) {
            // "Not acceptable"
            res.status(406).send();
            return;
          }
          console.log("(3/) procurement_type_id insert success");
        }
      );
    }
  });

  // Scan for tender_type_id and update into opportunities table
  console.log("Retrieving tender_type_id");
  Retrieve.TenderType(body, (error, results) => {
    if (error || results.length == 0) {
      console.log("Tender type does not exist in database");
      // "Not found"
      res.status(404).send();
      return;
    } else {
      console.log("tender_type_id successfully retrieved");
      let tender_type_id = results[0].tender_type_id;
      Upload.UploadTenderType(tender_no, tender_type_id, (error, results) => {
        if (error) {
          // "Not acceptable"
          res.status(406).send();
          return;
        }
        console.log("(4/) tender_type_id_id insert success");
      });
    }
  });

  // Scan for procurement_nature_id and update into opportunities table
  console.log("Retrieving procurement_nature_id");
  Retrieve.ProcurementNature(body, (error, results) => {
    if (error || results.length == 0) {
      console.log("Procurement nature does not exist in database");
      // "Not found"
      res.status(404).send();
      return;
    } else {
      console.log("tender_type_id successfully retrieved");
      let procurement_nature_id = results[0].procurement_nature_id;
      Upload.UploadProcurementNature(
        tender_no,
        procurement_nature_id,
        (error, results) => {
          if (error) {
            // "Not acceptable"
            res.status(406).send();
            return;
          }
          console.log("(5/) procurement_nature_id insert success");
        }
      );
    }
  });

  // Scan for procurement_method_id and update into opportunities table
  console.log("Retrieving procurement_method_id");
  Retrieve.ProcurementMethod(body, (error, results) => {
    if (error || results.length == 0) {
      console.log("Procurement type does not exist in database");
      // "Not found"
      res.status(404).send();
      return;
    } else {
      console.log("procurement_method_id successfully retrieved");
      let procurement_method_id = results[0].procurement_method_id;
      Upload.UploadProcurementMethod(
        tender_no,
        procurement_method_id,
        (error, results) => {
          if (error) {
            // "Not acceptable"
            res.status(406).send();
            return;
          }
          console.log("(6/) procurement_method_id insert success");
        }
      );
    }
  });

  // Scan for supply_head_id and update into opportunities table
  console.log("Retrieving supply_head_id");
  Retrieve.SupplyHead(body, (error, results) => {
    if (error || results.length == 0) {
      console.log("Supply head does not exist in database");
      // "Not found"
      res.status(404).send();
      return;
    } else {
      console.log("supply_head_id successfully retrieved");
      let supply_head_id = results[0].supply_head_id;
      // Upload.UploadSupplyHead(tender_no, supply_head_id, (error, results) => {
      //   if (error) {
      //     // "Not acceptable"
      //     res.status(406).send();
      //     return;
      //   }
      //   console.log("(7/) supply_head_id insert success");
      //   res.status(201).send(results);
      // });
    }
  });
});

module.exports = app;
