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

  if (request.query && request.query.offset) offset = parseInt(request.query.offset, conversionBase);
  if (request.query && request.query.limit) limit = parseInt(request.query.limit, conversionBase);

  Album.find().skip(offset).limit(limit).sort({ title: 1 }).exec()
      .then((albums) => setResponse(responseObject, process.env.HTTP_STATUS_OK, albums))
      .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, error))
      .finally(() => sendResponse(response, responseObject));
};

const getById = (request, response, next) => {
  const id = request.params.id;
  let responseObject = {
    status: 200,
    data: "",
  };

  Album.findById(id).exec()
      .then((album) => setResponse(responseObject, process.env.HTTP_STATUS_OK, album))
      .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, error))
      .finally(() => sendResponse(response, responseObject));
};

const saveAlbum = (request, response, next) => {
  const newAlbumData = request.body;
  let responseObject = {
    status: 200,
    data: "",
  };

  new Album(newAlbumData).save()
    .then((savedAlbum) => setResponse(responseObject, process.env.HTTP_STATUS_OK, savedAlbum))
    .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, error))
    .finally(() => sendResponse(response, responseObject));
};

module.exports = {
  getAll: getAllByPagination,
  getOne: getById,
  save: saveAlbum,
};
