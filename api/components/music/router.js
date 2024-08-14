const express = require("express");

const router = express.Router();

const musicController = require("./album/controller");

router.route("").get(musicController.getAll);

router.route("/:id").get(musicController.getOne);

module.exports = router;
