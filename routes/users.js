const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {asyncHandler, handleValidationErrors, csrfProtection} = require('./utils');
const { User } = require('../db/models')


/* GET users listing. */
router.get('/', function(req, res, next) { // User homepage
  res.send('User HomePage');
});

router.get('/register', csrfProtection, asyncHandler(async(req, res) => { // grabbing the registration page
  res.render('user-register', { title: "Registration", csrfToken: req.csrfToken()})
}));

router.post('/register', csrfProtection, asyncHandler(async(req, res) => { // creates the new user and redirect them to their homepage

}));

router.get('/login')

module.exports = router;
