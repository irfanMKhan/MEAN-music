const { Album } = require("../../../database/schemas/AlbumSchema");

const conversionBase = process.env.CONVERSION_BASE;

const _setResponse = (status, data) => {
  const response = {
    status: status,
    data: data,
  };

  return new Promise((resolve, reject) => {
    resolve(response);
  });
};

const _sendResponse = (response, object) => {
  response.status(object.status).json(object.data);
};

const getAllByPagination = (request, response, next) => {
  let responseObject = {
    status: 200,
    data: "",
  };

  const offset = 0;
  const limit = 5;

  if (request.query && request.query.offset) offset = request.query.offset;
  if (request.query && request.query.limit) limit = request.query.limit;

  Album.find().skip(offset).limit(limit).exec()
       .then((albums) => _setResponse(200, albums))
       .then((processedResponse) => { responseObject = processedResponse; })
       .catch((error) => { responseObject.status = 500; responseObject.data = error})
       .finally(() => _sendResponse(response, responseObject));
};

module.exports = { getAll: getAllByPagination };
