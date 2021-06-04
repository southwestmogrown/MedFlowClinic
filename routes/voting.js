const express = require('express');
const router = express.Router();
const {asyncHandler} = require('./utils');
const {Question, Answer, User} = require("../db/models");
const {requireAuth} = require("../auth");

const vote = {score: 0};

router.patch("/upvote", requireAuth, asyncHandler(async (req, res) => {

    vote.score += 1;
    /*const voteCount = req.body;
    console.log(req.body);*/
    res.json({score: vote.score});
}));



module.exports = router;
