const express = require('express');
const router = express.Router();
const {asyncHandler} = require('./utils');
const {Question} = require("../db/models");

/* GET home page. */
//Render 5 most recently asked question
router.get('/', asyncHandler(async function(req, res, next) {
  const questions = await Question.findAll({
    order: [["createdAt", "DESC"]],
    limit: 5
  });

  res.render('index', { questions, title: 'MedFlowClinic Homepage' });
}));

router.post('/')
module.exports = router;
