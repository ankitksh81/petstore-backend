const mongoose = require("mongoose");
const config = require("../../config");
const logger = require("../../logger");
require("./models/pet.model");

// connection uri
const dbURI = config.MONGOURI;

// create db connection
mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      logger.error("Database connection error, ", err);
      throw err;
    } else {
      logger.info("Connected to MongoDB database.");
    }
  }
);

// When successfully connected
mongoose.connection.on("connected", function () {
  logger.info("Mongoose default connection open to " + dbURI);
});

mongoose.connection.on("open", function () {
  logger.info("Connected...");
});

// When connection is successfully disconnected
mongoose.connection.on("disconnected", function () {
  logger.info("Mongoose default connection disconnected");
});

// If the connection throws an error
mongoose.connection.on("error", function (err) {
  logger.info("Mongoose default connection error: " + err);
});

// If node process ends, close the connection
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    logger.info(
      "Mongoose default connection disconnected through app termination"
    );
  });
  throw new Error(
    "Mongoose default connection disconnected through app termination"
  );
});

module.exports = mongoose;
