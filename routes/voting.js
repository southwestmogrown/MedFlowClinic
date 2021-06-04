const express = require('express');
const router = express.Router();
const {asyncHandler} = require('./utils');
const {Question, Answer, User} = require("../db/models");
const {requireAuth} = require("../auth");

const vote = {score: 99};

router.patch("/upvote", requireAuth, asyncHandler(async (req, res) => {
    res.json(vote);
}));

module.exports = router;
