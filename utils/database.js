// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

// let _db;
// const mongoConnect = (callback) => {
//   MongoClient.connect(
//     "mongodb+srv://serradjmohamed55:hK6QtSEv1WJpSO2j@cluster0.8jjw84b.mongodb.net/orsim?retryWrites=true&w=majority"
//   )
//     .then((client) => {
//       console.log("Connected!");
//       _db = client.db();
//       callback();
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "No database found!";
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;
