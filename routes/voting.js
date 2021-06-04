const express = require('express');
const router = express.Router();
const {asyncHandler} = require('./utils');
const {Question, Answer, User} = require("../db/models");
const {requireAuth} = require("../auth");

const vote = {score: 99};

router.patch("/upvote/:id(\\d+)", requireAuth, asyncHandler(async (req, res) => {
    //upvote button should upvote question 7 data and only do it once
    const question = await Question.findByPk(req.params.id);
    question.voteCount++;

    res.json(vote);
}));



module.exports = router;
