var db = require("../config/database");
var moment = require("moment");

const Upload = {
  UploadAgency: (tender_no, agency_id, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      //UPDATE `gebiz`.`opportunities` SET `agency_id` = '69' WHERE (`opportunity_id` = '130');
      const UploadAgencyQuery = `update opportunities set agency_id = ${agency_id} where (tender_no = '${tender_no}')`;
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
      const UploadBasicInfoQuery = `INSERT INTO opportunities (opportunity_name, tender_no, Published_date, planned_closed_date, extended_closed_date, offer_valid_days, award_date, total_awarded_value) 
      VALUES ('${request["Name of Opportunity"]}','${request["Tender No."]}','${request["Published Date"]}' ,'${request["Planned Close Date"]}','${request["Extended Close Date"]}', '${request["Offer Validity Duration (Days)"]}', '${request["Date of Award"]}','${request["Total awarded value"]}')
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
