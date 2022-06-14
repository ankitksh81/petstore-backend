const config = require('../config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('../logger');

// Express app
const app = express();
app.use(cors());

// http logger
app.use(morgan('tiny'));

// parse application/json & application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = config.PORT || 8001;
const ip = config.IP || '127.0.0.1';

app.listen({ port, ip }, () => 
    logger.info(`🚀 Server running at http://${ip}:${port}`),
);