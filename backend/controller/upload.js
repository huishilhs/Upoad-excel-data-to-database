const express = require("express");
const app = express();
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import models
const Upload = require("../model/upload");
const { builtinModules } = require("module");

//use express static folder
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/upload/excel", (req, res) => {
  Upload.UploadAgency((error, results) => {
    if (error) {
      res.status(500).send();
      return;
    }
    res.status(200).send(results);
  });
});

module.exports = app;
