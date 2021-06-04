const express = require('express');
const router = express.Router();
const {asyncHandler} = require('./utils');
const {Question, User} = require("../db/models");

/* GET home page. */
//Render 5 most recently asked question
router.get('/', asyncHandler(async function(req, res, next) {
  const questions = await Question.findAll({
    include: User,
    order: [["createdAt", "DESC"]],
    limit: 10
  });

questions.forEach(question => {
  question.User = question.User.userName;  
});


  res.render('index', { questions, title: 'MedFlowClinic Homepage' });
}));

module.exports = router;
