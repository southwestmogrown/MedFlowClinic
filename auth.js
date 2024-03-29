const db = require('./db/models');

const loginUser = (req, res, user) => { //Logs in user
    req.session.auth = {
      userId: user.id,
    };
  };

const requireAuth = (req, res, next) => { //Used for routes that require user to login
    if (!res.locals.authenticated) {
      return res.redirect('/users/login');
    }
    return next();
};

const logoutUser = (req, res) => { //Logs out user
    delete req.session.auth;
};

const restoreUser = async (req, res, next) => {
    // Log the session object to the console
    // to assist with debugging.
    // console.log(req.session);

    if (req.session.auth) {
      const { userId } = req.session.auth;

      try {
        const user = await db.User.findByPk(userId);

        if (user) {
          res.locals.authenticated = true;
          res.locals.user = user;
          next();
        }
      } catch (err) {
        res.locals.authenticated = false;
        next(err);
      }
    } else {
      res.locals.authenticated = false;
      next();
    }
  };

module.exports = {
    loginUser,
    restoreUser,
    logoutUser,
    requireAuth
}
