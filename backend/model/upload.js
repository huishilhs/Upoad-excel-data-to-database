var db = require("../config/database");
var moment = require("moment");

const Upload = {
  UploadAgency: (request, agency_id, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const UploadAgencyQuery = `INSERT INTO opportunities (opportunity_name, tender_no, agency_id, Published_date, planned_closed_date, extended_closed_date) 
      VALUES ('${request["Name of Opportunity"]}','${request["Tender No."]}','${agency_id}','${request["Published Date"]}' ,'${request["Planned Close Date"]}','${request["Extended Close Date"]}')
      ;`;
      dbConn.query(UploadAgencyQuery, (error, results) => {
        dbConn.end();
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },

  UploadBasicInfo: (request, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const UploadBasicInfoQuery = `INSERT INTO opportunities (opportunity_name, tender_no, Published_date, planned_closed_date, extended_closed_date, award_date, total_awarded_value) 
      VALUES ('${request["Name of Opportunity"]}','${request["Tender No."]}','${request["Published Date"]}' ,'${request["Planned Close Date"]}','${request["Extended Close Date"]}','${request["Date of Award"]}','${request["Total awarded value"]}')
      ;`;
      dbConn.query(UploadBasicInfoQuery, (error, results) => {
        dbConn.end();
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },
};

module.exports = Upload;
