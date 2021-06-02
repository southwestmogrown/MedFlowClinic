const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const bcrypt = require('bcryptjs');
const {asyncHandler, handleValidationErrors, csrfProtection} = require('./utils');
const { User } = require('../db/models');
const {restoreUser, loginUser, logoutUser} = require("../auth");



/* GET users listing. */
router.get('/', function(req, res, next) { // User homepage
  res.send('User HomePage');

});

router.get('/register', csrfProtection, asyncHandler(async(req, res) => { // grabbing the registration page
  res.render('user-register', { title: "Registration", csrfToken: req.csrfToken()})
}));

const userValidators = [
  check("userName")
    .exists({checkFalsy: true})
    .withMessage("Please provide a username")
    .isLength({max: 75})
    .withMessage("Username must not be longer than 75 characters"),
  check("email")
    .exists({checkFalsy: true})
    .withMessage("Please provide an email")
    .isLength({max: 75})
    .withMessage("Email must not be longer than 255 characters")
    .isEmail()
    .withMessage("Email address is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { emailAddress: value } })
      .then((user) => {
        if (user) {
          return Promise.reject('The provided Email Address is already in use by another account');
        }
      })}),
  check("password")
    .exists({checkFalsy: true})
    .withMessage("Please provide a password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage("Password must contain at least 1 lowercase letter, uppercase letter, number, and special character"),
  check("confirmPassword")
      .exists({checkFalsy: true})
      .withMessage('Please provide a value for Confirm Password')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Confirm Password does not match Password');
        }
        return true;
      }),
];

router.post('/register', csrfProtection, userValidators, handleValidationErrors, asyncHandler(async(req, res) => { // creates the new user and redirect them to their homepage
  const {userName, email, password, professionalUser} = req.body

  const hashedPassword = await bcrypt.hashedPassword(password, 10);

  const user = await User.create({
    userName,
    email,
    hashedPassword,
    professionalUser
  });

  res.redirect('/users/');


}));

router.get('/login')

module.exports = router;
