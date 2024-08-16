require("dotenv").config();

require("./api/processOn");
require("./api/database/connection");
require("./api/database/schema");

const router = require("./api/routes");

const express = require("express");

const application = express();
application.use(express.json());
application.use(express.urlencoded({ extended: true }));

const corsHandler_CallBack = (request, response, next) => {  
  response.header(process.env.ACCESS_CONTROL_ALLOW_ORIGIN_FIELD, process.env.ACCESS_CONTROL_ALLOW_ORIGIN_VALUE);
  response.header(process.env.ACCESS_CONTROL_ALLOW_METHOD_FIELD, process.env.ACCESS_CONTROL_ALLOW_METHOD_VALUE);
  response.header(process.env.ACCESS_CONTROL_ALLOW_HEADER_FIELD, process.env.ACCESS_CONTROL_ALLOW_HEADER_VALUE);
  next();
};

application.use(process.env.BASE_URI, corsHandler_CallBack);

application.use(process.env.BASE_URI + process.env.API_SUBSET_ROUTE, router);

const applicationListener_CallBack = () => {
  console.log(process.env.MESSAGE_SERVER_START, server.address().port);
};

const port = process.env.PORT;
const server = application.listen(port, applicationListener_CallBack);
