const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {asyncHandler, csrfProtection} = require('./utils');
const {requireAuth} = require("../auth");
const {Question, Answer} = require("../db/models");

//get question by id and render a page with the question and its answers
router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    const question = await Question.findByPk(req.params.id, {
        include: Answer
    });

    res.render("question-page", {question});
}));

module.exports = router;
