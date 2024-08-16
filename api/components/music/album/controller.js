const mongoose = require("mongoose");

const { setResponse, sendResponse } = require("../../../util");

const Album = mongoose.model(process.env.MONGOOSE_MODEL_ALBUM);
const conversionBase = process.env.CONVERSION_BASE;

const getAllByPagination = (request, response, next) => {
  let offset = 0;
  let limit = 5;
  const responseObject = {
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
  const responseObject = {
    status: 200,
    data: "",
  };

  Album.findById(id).exec()
      .then((album) => setResponse(responseObject, process.env.HTTP_STATUS_OK, album))
      .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, error))
      .finally(() => sendResponse(response, responseObject));
};

const save = (request, response, next) => {
  const newAlbumData = request.body;
  const responseObject = {
    status: 200,
    data: "",
  };  

  new Album(newAlbumData).save()
    .then((savedData) => setResponse(responseObject, process.env.HTTP_STATUS_OK, savedData))
    .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, error))
    .finally(() => sendResponse(response, responseObject));
};

const update = (request, response, next) => {
  const albumId = request.params.id;
  const updatedAlbumData = request.body;
  const responseObject = {
    status: 200,
    data: "",
  };

  Album.findByIdAndUpdate(albumId, updatedAlbumData).exec()
    .then((updatedData) => setResponse(responseObject, process.env.HTTP_STATUS_OK, updatedData))
    .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, error))
    .finally(() => sendResponse(response, responseObject));
};

const replace = (request, response, next) => {
  const albumId = request.params.id;
  const updatedAlbumData = request.body;
  const responseObject = {
    status: 200,
    data: "",
  };

  Album.findById(albumId).exec()
    .then((queriedData)=> Album.findOneAndReplace(queriedData, updatedAlbumData))  
    .then((updatedData) => setResponse(responseObject, process.env.HTTP_STATUS_OK, updatedData))  
    .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, error))
    .finally(() => sendResponse(response, responseObject));   
};

const remove = (request, response, next) => {
  const id = request.params.id;
  const responseObject = {
    status: 200,
    data: "",
  };

  Album.findByIdAndDelete(id).exec()
    .then((data) => setResponse(responseObject, process.env.HTTP_STATUS_OK, data))
    .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, error))
    .finally(() => sendResponse(response, responseObject));
};

module.exports = {
  getAll: getAllByPagination,
  getOne: getById,
  save: save,
  patch: update,
  update: replace,
  delete: remove,
};
