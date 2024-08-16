const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { setResponse, sendResponse } = require("../../util");

const User = mongoose.model(process.env.MONGOOSE_MODEL_USER);

const _create = (hash, newUser) => {
  newUser.passwordHash = hash;
  return new User(newUser).save();
};

const register = (request, response, next) => {
  const responseObject = {
    status: 200,
    data: "",
  };

  const password = request.body.password;

  const newUser = {
    name: request.body.name,
    username: request.body.username,
    passwordHash: "",
    age: request.body.age,
    createdOn: Date.now(),
  };   
  console.log(newUser);
  

  /**
   * NOTE : schema validation do not catch.
   */
  bcrypt.genSalt(parseInt(process.env.GENERATE_SALT_ROUND, process.env.CONVERSION_BASE))
    .then((salt) => bcrypt.hash(password, salt))    
    .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, process.env.MESSAGE_FAILED_TO_GENERATE_SALT + error.message))
    .then((hash) => _create(hash, newUser))
    .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, process.env.MESSAGE_FAILED_TO_GENERATE_HASH + error.message))    
    .then((user) => setResponse(responseObject, process.env.HTTP_STATUS_OK, user))
    .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, process.env.MESSAGE_FAILED_TO_CREATE_USER + error.message))
    .finally(() => sendResponse(response, responseObject));
};

const _doUserExists = (user) => {
  return new Promise((resolve, reject) => {
    if (user) {
      resolve(user);
    } else {
      reject(process.env.MESSAGE_USER_NOT_EXISTS);
    }
  });
};

const _isPasswordMatched = (isMatched) => {
  return new Promise((resolve, reject) => {
    if (isMatched) {
      resolve();
    } else {
      reject(process.env.MESSAGE_PASSWORD_DOESNT_MATCH);
    }
  });
};

const _generateToken = (username) => {
  return new Promise((resolve, reject) => {
    try {
      const token = jwt.sign({ username }, process.env.TOKEN_PRIVATE_KEY);
      resolve(token);
    } catch (error) {
      reject(error);
    }
  });
};

const login = (request, response, next) => {
  const responseObject = {
    status: 200,
    data: "",
  };
  
  const username = request.body.username;
  const password = request.body.password;

  User.findOne({ username: username }).exec()
    .then((user) => _doUserExists(user))    
    .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, process.env.MESSAGE_USER_NOT_EXISTS + error.message))
    .then((user) => bcrypt.compare(password, user.passwordHash))
    .then((isMatched) => _isPasswordMatched(isMatched))
    .then(() => _generateToken(username))    
    .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_UNAUTHORISED, process.env.MESSAGE_UNAUTHORISED + error.message))
    .then((token) => setResponse(responseObject, process.env.HTTP_STATUS_OK, token))    
    .catch((error) => setResponse(responseObject, process.env.HTTP_STATUS_INTERNAL_SERVER_ERROR, process.env.MESSAGE_FAILED_TO_GENERATE_TOKEN + error.message))
    .finally(() => sendResponse(response, responseObject));
};


const validateToken = (request, response, next) => {
  const authorizationHeader = request.headers[process.env.REQUEST_HEADER_AUTHORIZATION_KEY];

  if (!authorizationHeader) {
    response.status(process.env.HTTP_STATUS_UNAUTHORISED).json(process.env.MESSAGE_TOKEN_MISSING);
  } else {
    try {
      const isValid = jwt.verify(authorizationHeader, process.env.TOKEN_PRIVATE_KEY);
      if (isValid) {
        next();
      } else {
        response.status(process.env.HTTP_STATUS_UNAUTHORISED).json(process.env.UNAUTHORISED_MESSAGE);
      }
    } catch (error) {
      response.status(process.env.HTTP_STATUS_UNAUTHORISED).json(process.env.UNAUTHORISED_MESSAGE + error.message);
    }
  }
};

module.exports = {
  register: register,
  login: login,
  validate: validateToken,
};
