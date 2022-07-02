var db = require("../config/database");

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
};

module.exports = Upload;
