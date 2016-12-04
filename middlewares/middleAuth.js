var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var users = require('../models/modelUsers.js');

passport.use(new localStrategy(
  function(username, password, done) {
    users.findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!users.checkPassword(username, password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  users.findById(id, function (err, user) {
    if (err) { return done(err); }
    done(null, user);
  });
});

module.exports = passport;
