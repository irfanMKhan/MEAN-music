const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = mongoose.model(process.env.MONGOOSE_MODEL_USER);

const _setResponseForServerError = (response, message) => {
  response.status = 500;
  response.message = message;
};
_sendResponse = (res, response) => {
  res.status(response.status).json(response.data);
};
const getUsers = (req, res) => {
  let response = {
    status: 200,
  };
  User.find()
    .exec()
    .then((users) => {
      response.data = users;
    })
    .catch((error) => {
      response.status = 500;
      response.data = error;
    })
    .finally(() => res.status(response.status).json(response.data));
};

const _createUser = (hash, newUser) => {
  return new Promise((resolve, reject) => {
    newUser.passwordHash = hash;
    User.create(newUser)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => reject(error));
  });
};

const _setRespponseForSuccess = (response, data) => {
  response.status = 200;
  response.data = data;
};
const createUser = (req, res) => {
  let response = {
    status: 200,
    data: "",
  };
  const password = req.body.password;

  const newUser = {
    username: req.body.username,
    passwordHash: "",
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    createdOn: Date.now(),
  };

  bcrypt
    .genSalt(process.env.SALT_ROUND)
    .then((salt) => bcrypt.hash(password, salt))
    .catch((error) =>
      _setResponseForServerError(
        response,
        process.env.FAILED_TO_GENERATE_SALT_MESSAGE + error.message
      )
    )
    .then((hash) => _createUser(hash, newUser))
    .catch((error) =>
      _setResponseForServerError(
        response,
        process.env.FAILED_TO_GENERATE_HASH_MESSAGE + error.message
      )
    )
    .then((user) => _setRespponseForSuccess(response, user))
    .catch((error) =>
      _setResponseForServerError(
        response,
        process.env.FAILED_TO_CREATE_USER_MESSAGE + error.message
      )
    )
    .finally(() => _sendResponse(res, response));
};

const _doesUserExists = (user) => {
  return new Promise((resolve, reject) => {
    if (user) {
      resolve(user);
    } else {
      reject(process.env.USER_NOT_EXISTS);
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
const _isPasswordMatched = (isMatched) => {
  return new Promise((resolve, reject) => {
    if (isMatched) {
      resolve();
    } else {
      reject(process.env.PASSWORD_DOESNT_MATCH_MESSAGE);
    }
  });
};
const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let response = {
    status: 200,
    data: "",
  };

  User.findOne({ username: username })
    .exec()
    .then((user) => _doesUserExists(user))
    .catch((error) => console.log(process.env.USER_NOT_EXISTS + error.message))
    .then((user) => bcrypt.compare(password, user.passwordHash))
    .then((isMatched) => _isPasswordMatched(isMatched))
    .then(() => _generateToken(username))
    .catch((error) => console.log(process.env.UNAUTHORISED_MESSAGE + error))
    .then((token) => _setRespponseForSuccess(response, token))
    .catch((error) =>
      console.log(process.env.FAILED_TO_GENERATE_TOKEN_MESSAGE + error)
    )
    .finally(() => _sendResponse(res, response));
};

const validateToken = (req, res, next) => {
  const authorizationHeader = req.headers[process.env.AUTHORIZATION_HEADER_KEY];

  if (!authorizationHeader) {
    res.status(401).json(process.env.TOKEN_MISSING_MESSAGE);
  } else {
    try {
      const isValid = jwt.verify(
        authorizationHeader,
        process.env.TOKEN_PRIVATE_KEY
      );
      if (isValid) {
        next();
      } else {
        res.status(401).json(process.env.UNAUTHORISED_MESSAGE);
      }
    } catch (error) {
      res.status(401).json(process.env.UNAUTHORISED_MESSAGE + error.message);
    }
  }
};
module.exports = {
  getUsers,
  createUser,
  login,
  validateToken,
};
