var db = require("../config/database");

const Upload = {
  UploadAgency: (callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const testQuery = ``;
      dbConn.query(testQuery, (error, results) => {
        dbConn.end();
        if (error) {
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },
};

module.exports = Upload; 