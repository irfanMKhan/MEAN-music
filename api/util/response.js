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

module.exports = { set: _setResponse, send: _sendResponse };
