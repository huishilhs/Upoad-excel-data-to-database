var mysql = require("mysql");

// database settings
var dbConnect = {
  getConnection: function () {
    var conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "!am)sam)och113",
      database: "gebiz",
    });

    return conn;
  },
};
module.exports = dbConnect;
