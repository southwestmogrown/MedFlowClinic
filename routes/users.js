const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const  bcrypt  = require('bcryptjs');
const {asyncHandler, handleValidationErrors, csrfProtection} = require('./utils');
const { User } = require('../db/models');
const {restoreUser, loginUser, logoutUser} = require("../auth");





/* GET users listing. */
router.get('/', function(req, res, next) { // User homepage
  res.send('User HomePage');

});

router.get('/register', csrfProtection, asyncHandler(async(req, res) => { // grabbing the registration page
  const user = {userName: null, email: null};
  res.render('user-register', { title: "Registration", csrfToken: req.csrfToken(), user})
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
      return User.findOne({ where: { email: value } })
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

router.post('/register', csrfProtection, userValidators, asyncHandler(async(req, res) => { // creates the new user and redirect them to their homepage
  //need to figure out errorValidators, but it is creating a user in the database, just without the constraints
  const {userName, email, password} = req.body
  let { professionalUser } = req.body;

  if(professionalUser) {
    professionalUser = true;
  } else {
    professionalUser = false;
  }
  
  const user = await User.build({
    userName,
    email,
    professionalUser
  });

  const validatorErrors = validationResult(req)
  console.log(validatorErrors)
  if(validatorErrors.isEmpty()){
    const hashedPassword = await bcrypt.hash(password, 10)
    user.hashedPassword = hashedPassword;
    await user.save()
    loginUser(req, res, user)
    res.redirect('/')
  } else {
    const errors = validatorErrors.array().map((error) => error.msg);
    res.render('user-register', {
      title: 'Register',
      user,
      errors,
      csrfToken: req.csrfToken(),
    });
  }
}));


router.get('/login')

module.exports = router;
