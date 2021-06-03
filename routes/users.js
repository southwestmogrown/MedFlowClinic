const express = require('express');
const router = express.Router();
const {asyncHandler, csrfProtection} = require('./utils');
const {check, validationResult} = require('express-validator');
const bcrypt  = require('bcryptjs');
const { User, Answer, Question } = require('../db/models');
const { loginUser, logoutUser } = require("../auth");
const session = require('express-session')



router.get('/homepage', asyncHandler(async (req, res) =>  { // User homepage
  const { userId } = req.session.auth
  // const user = await User.findByPk(userId, {include: Answer})
  const user = await User.findByPk(1, {include: Answer})
  console.log(user)
  console.log(user.Answers)
  const answers = user.Answers


  res.render('users-homepage', { title: "Demo User Homepage", answers, user});
}));



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
    res.redirect('/users')
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


router.get('/login', csrfProtection, (req, res) => {

  res.render('user-login', { title: 'Login', csrfToken: req.csrfToken() });
});

const loginValidators = [
  check('email')
    .exists({checkFalsy: true})
    .withMessage('Please provide an Email Address'),
  check('password')
    .exists({checkFalsy: true})
    .withMessage('Please provide a Password')
];

router.post('/login', csrfProtection, loginValidators, asyncHandler(async(req, res) => {
  const { email, password } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const user = await User.findOne({ where: { email } })

    if(user) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
      if (passwordMatch) {
        loginUser(req, res, user)
        return res.redirect('/users/homepage')
      }
    }
    errors.push('Login failed for the provided email address and password');
  } else {
    errors = validatorErrors.array().map((error) => error.msg)
  }

  res.render('user-login', {
    title: 'Login',
    email,
    errors,
    csrfToken: req.csrfToken()
  });

}));

router.post('/demo',
  csrfProtection,
  asyncHandler(async(req, res) => {
    const user = await User.findByPk(1);
    console.log(user)
    loginUser(req, res, user);
    return res.redirect("/homepage");
  })
);

router.post('/logout', (req, res) => {
  logoutUser(req, res)
  res.redirect('/')
});



module.exports = router;
