var db = require("../config/database");

const Retrieve = {
  // Retrieve agency_id
  Agency: (request, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const RetrieveAgencyQuery = `select * from agencies where agency_name LIKE '%${request["Agency"]}%'`;
      dbConn.query(RetrieveAgencyQuery, (error, results) => {
        dbConn.end();
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },

  // Retrieve procurement_type_id
  ProcurementType: (request, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const RetrieveProcurementTypeQuery = `select * from procurement_types where procurement_type_name LIKE '%${request["Procurement Type"]}%'`;
      dbConn.query(RetrieveProcurementTypeQuery, (error, results) => {
        dbConn.end();
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },

  // Retrieve tender_type_id
  TenderType: (request, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const RetrieveTenderTypeQuery = `select * from tender_types where tender_type_name LIKE '%${request["Tender Type"]}%'`;
      dbConn.query(RetrieveTenderTypeQuery, (error, results) => {
        dbConn.end();
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },

  // Retrieve procurement_nature_id
  ProcurementNature: (request, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const RetrieveProcurementNatureQuery = `select * from procurement_natures where procurement_nature_name LIKE '%${request["Procurement Nature"]}%'`;
      dbConn.query(RetrieveProcurementNatureQuery, (error, results) => {
        dbConn.end();
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },

  // Retrieve procurement_method_id
  ProcurementMethod: (request, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const RetrieveProcurementMethodQuery = `select * from procurement_methods where procurement_method_name LIKE '%${request["Procurement Method"]}%'`;
      dbConn.query(RetrieveProcurementMethodQuery, (error, results) => {
        dbConn.end();
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        return callback(null, results);
      });
    });
  },

  // Retrieve procurement_method_id
  SupplyHead: (request, callback) => {
    var dbConn = db.getConnection();
    dbConn.connect((err) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      const RetrieveSupplyHeadQuery = `select * from supply_heads where supply_head_name LIKE '%${request["Supply Head"][0]}%'`;
      dbConn.query(RetrieveSupplyHeadQuery, (error, results) => {
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

module.exports = Retrieve;
