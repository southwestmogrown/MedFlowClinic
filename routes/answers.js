const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Answer, Question } = require('../db/models');
const {requireAuth} = require("../auth")

router.get('/', csrfProtection, requireAuth, asyncHandler(async(req, res) => {
    res.render('answers', { title: 'Answers', csrfToken: req.csrfToken() });
}));

const answerValidators = [
    check('answer')
        .exists({checkFalsy: true})
        .withMessage('Please provide an answer')
];


router.post('/', csrfProtection, answerValidators, requireAuth, asyncHandler(async(req, res) => {
    const {answer} = req.body
    console.log(db.Answer)
    const newAnswer = await db.Answer.build({
        answer,
        questionId: 3,
        voteCount: 0,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });

    const validatorErrors = validationResult(req);
    

    if(validatorErrors.isEmpty()) {
        await newAnswer.save()
        res.redirect('/')
    } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('answers', {
            title: 'Answers',
            errors,
            csrfToken: req.csrfToken(),
        })
    }

}));

module.exports = router
