const express = require("express");

const musicRouter = require("../components/music/router");
const userRouter = require("../components/user/router");

const router = express.Router();

router.use(process.env.MUSIC_SUBSET_ROUTE, musicRouter);
router.use(process.env.USER_SUBSET_ROUTE, userRouter);

module.exports = router;
