const express = require("express");

const musicRouter = require("../components/music/router");

const router = express.Router();

router.use(process.env.MUSIC_SUBSET_ROUTE, musicRouter);

module.exports = router;
