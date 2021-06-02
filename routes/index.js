const express = require('express');
const router = express.Router();
const {asyncHandler} = require('./utils');

/* GET home page. */
//Render 5 most recently asked question
router.get('/', asyncHandler(async function(req, res, next) {
  const questions = 
  res.render('index', { title: 'MedFlowClinic Homepage' });
}));

module.exports = router;
