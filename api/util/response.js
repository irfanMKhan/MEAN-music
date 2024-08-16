const _setResponse = (responseObject, status, data) => {
  responseObject.status = status;
  responseObject.data = data;
};

const _sendResponse = (response, object) => {
  response.status(object.status).json(object.data);
};

module.exports = { set: _setResponse, send: _sendResponse };
