const mongoose = require("mongoose");

const { setResponse, sendResponse } = require("../../../util");

const Album = mongoose.model("ALBUM");
const conversionBase = process.env.CONVERSION_BASE;

const getAllByPagination = (request, response, next) => {
  let offset = 0;
  let limit = 5;
  let responseObject = {
    status: 200,
    data: "",
  };

  if (request.query && request.query.offset) offset = request.query.offset;
  if (request.query && request.query.limit) limit = request.query.limit;

  Album.find().skip(offset).limit(limit).sort({ title: 1 }).exec()
    .then((albums) => setResponse(process.env.HTTP_STATUS_OK, albums))
    .then((processedResponse) => {
      responseObject = processedResponse;
    })
    .catch((error) => {
      responseObject.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      responseObject.data = error;
    })
    .finally(() => sendResponse(response, responseObject));
};

const getById = (request, response, next) => {
  const id = request.params.id;
  let responseObject = {
    status: 200,
    data: "",
  };

  Album.findById(id).exec()
    .then((album) => setResponse(process.env.HTTP_STATUS_OK, album))
    .then((processedResponse) => {
      responseObject = processedResponse;
    })
    .catch((error) => {
      responseObject.status = process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR;
      responseObject.data = error;
    })
    .finally(() => sendResponse(response, responseObject));
};

module.exports = { getAll: getAllByPagination, getOne: getById };
