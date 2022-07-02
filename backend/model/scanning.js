var db = require("../config/database");

const Scanning = {
  ScanningAgency: (request, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const ScanningAgencyQuery = `select * from agencies where agency_name LIKE '%${request["Agency"]}%'`;
      dbConn.query(ScanningAgencyQuery, (error, results) => {
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

module.exports = Scanning;
