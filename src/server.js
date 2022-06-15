const config = require("../config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("../logger");
const petRoutes = require("./routes/pet");
require("./database");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = config.PORT || 8001;
const ip = config.IP || "127.0.0.1";

app.use("/api/pet", petRoutes);

app.listen({ port, ip }, () =>
  logger.info(`🚀 Server running at http://${ip}:${port}`)
);
