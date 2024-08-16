const express = require("express");

const router = express.Router();

const musicController = require("./album/controller");
const userController = require("../user/controller");

router.route("")
      .get(musicController.getAll)
      .post(musicController.save);

router.route("/:id")
      .get(musicController.getOne)
      .patch(musicController.patch)
      .put(musicController.update)
      .delete(userController.validate, musicController.delete);

module.exports = router;
