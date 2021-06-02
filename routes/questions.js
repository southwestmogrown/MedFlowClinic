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

//render a page where user can input their question
router.get("/add", csrfProtection, asyncHandler(async (req, res) => {
    res.render("question-form", {csrfToken: req.csrfToken()});
}));

//posts question when submitted
router.post("/add", csrfProtection, asyncHandler(async (req, res) => {
    const {question} = req.body;
}));

module.exports = router;
