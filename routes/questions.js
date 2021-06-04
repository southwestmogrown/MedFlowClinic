const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const {asyncHandler, csrfProtection} = require('./utils');
const {requireAuth} = require("../auth");
const {Question, Answer, User} = require("../db/models");

//get question by id and render a page with the question and its answers
router.get("/:id(\\d+)", asyncHandler(async (req, res) => {
    const question = await Question.findByPk(req.params.id, {
        include: Answer,
    });
    const questionId = question.id;
    const answer = await Answer.findOne({where: {questionId}});
    const answerUserId = answer.userId;
    const questionUserId = question.userId;
    const userQ = await User.findByPk(questionUserId);
    const userA = await User.findByPk(answerUserId);
    res.render("question-page", {question, userQ, userA});
}));


const questionValidator = [
    check("question")
        .exists({checkFalsy: true})
        .withMessage("Please enter a question")
]

//render a page where user can input their question
router.get("/add", csrfProtection, requireAuth, asyncHandler(async (req, res) => {
    res.render("question-form", {csrfToken: req.csrfToken()});
}));

//posts question when submitted
router.post("/add", csrfProtection, requireAuth, questionValidator, asyncHandler(async (req, res) => {
    const {question} = req.body;
    const {userId} = req.session.auth;

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const newQuestion = await Question.create({
            question,
            voteCount: 0,
            userId
        });

        res.redirect(`/questions/${newQuestion.id}`);
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('question-form', {
            errors,
            csrfToken: req.csrfToken()
        });
    }
}));



module.exports = router;
