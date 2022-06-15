const bunyan = require("bunyan");
const config = require("../config");

const logger = bunyan.createLogger({
  name: config.SERVICE_NAME,
  streams: [
    {
      level: "info",
      stream: process.stdout,
    },
    {
      level: "error",
      stream: process.stderr,
    },
  ],
});

module.exports = logger;
