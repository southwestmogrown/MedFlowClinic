const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const { sessionSecret } = require('./config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const answersRouter = require('./routes/answers');

const questionsRouter = require('./routes/questions');

const votingRouter = require("./routes/voting");

const {restoreUser} = require("./auth")
// const { v4: uuidv4 } = require('uuid'); This is what we used to generate sessionSecret
//console.log(uuidv4());
const app = express();

// view engine setup
app.set('view engine', 'pug');
app.use(cookieParser(sessionSecret));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  name: 'Medflow_clinic.sid',
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(restoreUser);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/users', usersRouter);

app.use('/questions', answersRouter); //goes to answer routes which include id of question in path

app.use("/questions", questionsRouter);
app.use("/voting", votingRouter);


// set up session middleware
const store = new SequelizeStore({ db: sequelize });



app.use(
  session({
    secret: 'superSecret',
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
