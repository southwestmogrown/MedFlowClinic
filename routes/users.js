var express = require('express');
var router = express.Router();
const {check} = require('express-validator');
const {asyncHandler, handleValidationErrors, csrfProtection} = require('./utils');
const { User } = require('../db/models')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Registration Page');
});

router.post('/users/register')

module.exports = router;
