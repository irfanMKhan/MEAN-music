require("dotenv").config();

require("./api/processOn");
require("./api/database/connection");
require("./api/database/schema");

const router = require("./api/routes");

const express = require("express");

const application = express();

application.use(process.env.BASE_URI + process.env.API_SUBSET_ROUTE, router);

const applicationListener_CallBack = () => {
  console.log(process.env.MESSAGE_SERVER_START, server.address().port);
};

const port = process.env.PORT;
const server = application.listen(port, applicationListener_CallBack);
