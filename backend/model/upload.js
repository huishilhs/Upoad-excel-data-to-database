var db = require("../config/database");
var moment = require("moment");

const Upload = {
  // Update agency
  UploadAgency: (tender_no, agency_id, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
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

  // Insert basic data
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

  // Update procurement type
  UploadProcurementType: (tender_no, procurement_type_id, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const UploadProcurementTypeQuery = `update opportunities set procurement_type_id = ${procurement_type_id} where (tender_no = '${tender_no}')`;
      dbConn.query(UploadProcurementTypeQuery, (error, results) => {
        dbConn.end();
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },

  // Update tender type
  UploadTenderType: (tender_no, tender_type_id, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const UploadTenderTypeQuery = `update opportunities set tender_type_id = ${tender_type_id} where (tender_no = '${tender_no}')`;
      dbConn.query(UploadTenderTypeQuery, (error, results) => {
        dbConn.end();
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },

  // Update procurement nature
  UploadProcurementNature: (tender_no, procurement_nature_id, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const UploadProcurementNatureQuery = `update opportunities set procurement_nature_id = ${procurement_nature_id} where (tender_no = '${tender_no}')`;
      dbConn.query(UploadProcurementNatureQuery, (error, results) => {
        dbConn.end();
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },

  // Update procurement method
  UploadProcurementMethod: (tender_no, procurement_method_id, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const UploadProcurementMethodQuery = `update opportunities set procurement_method_id = ${procurement_method_id} where (tender_no = '${tender_no}')`;
      dbConn.query(UploadProcurementMethodQuery, (error, results) => {
        dbConn.end();
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },

  // Update supply head
  UploadSupplyHead: (tender_no, supply_head_id, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const UploadProcurementMethodQuery = `update opportunity_supply_heads set supply_head_id = ${supply_head_id} where (tender_no = '${tender_no}')`;
      dbConn.query(UploadProcurementMethodQuery, (error, results) => {
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
