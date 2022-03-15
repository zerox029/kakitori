const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("kakitori");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: () => {
    return dbConnection;
  }
};