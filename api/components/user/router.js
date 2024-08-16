const express = require("express");

const router = express.Router();

const userController = require("./controller");

router.route(process.env.LOGIN_SUBSET_ROUTE)
      .post(userController.login);

router.route(process.env.REGISTER_SUBSET_ROUTE)
      .post(userController.register)

router.route(process.env.BASE_URI)
      .post(userController.validate);

module.exports = router;
