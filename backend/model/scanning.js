var db = require("../config/database");

const Scanning = {
  ScanningAgency: (request, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      console.log();
      const ScanningAgencyQuery = `select * from agencies where agency_name LIKE '%${request[0]["Agency"]}%'`;
      dbConn.query(ScanningAgencyQuery, (error, results) => {
        dbConn.end();
        if (error) {
          return callback(error, null);
        }

        return callback(null, results);
      });
    });
  },
};

module.exports = Scanning;
