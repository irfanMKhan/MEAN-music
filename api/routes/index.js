const express = require("express");

const musicRouter = require("../components/music/router");

const router = express.Router();

router.use("/music", musicRouter);

module.exports = router;
