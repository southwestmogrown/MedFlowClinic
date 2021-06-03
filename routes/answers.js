const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require('./utils');
const { User, Answer, Question } = require('../db/models');
const {requireAuth} = require("../auth")

//Render answer page for user to input answer
router.get('/:id(\\d+)/answers', csrfProtection, requireAuth, asyncHandler(async(req, res) => {
    const id = req.params.id;

   const { userId } = req.session.auth;

   const user = await User.findByPk(userId);
    console.log(user.professionalUser)
   if(user.professionalUser) {
       res.render('answers', { id, title: 'Answers', csrfToken: req.csrfToken() });
   } else {
       res.render('unauthorized-user')
   }

}));

const answerValidators = [
    check('answer')
        .exists({checkFalsy: true})
        .withMessage('Please provide an answer')
];


//post question and redirect to proper question page
router.post('/:id(\\d+)/answers', csrfProtection, answerValidators, requireAuth, asyncHandler(async(req, res) => {
    const {answer} = req.body;

    const {userId} = req.session.auth;
    const id = req.params.id;

    const newAnswer = await Answer.build({
        answer,
        questionId: id,
        voteCount: 0,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    const validatorErrors = validationResult(req);
    

    if(validatorErrors.isEmpty()) {
        await newAnswer.save();
        res.redirect(`/questions/${id}`); //redirect to question page
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
