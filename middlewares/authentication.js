var passport = require('passport');
var LdapStrategy = require('passport-ldapauth').Strategy;

var OPTS = {
  server: {
    url: 'ldap://192.168.12.210:389',
    bindDn: 'cn=admin,dc=faraadid,dc=local',
    bindCredentials: 'FaraP@ss4Server',
    searchBase: "dc=faraadid,dc=local",
    searchFilter: '(uid={{username}})'
  }
};

passport.use(new LdapStrategy(OPTS));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.isLoggedIn = function(req, res, next) {
  var passportSession = req.session.passport == undefined ? [] : req.session.passport;
    if ('user' in passportSession) {
      next();
    } else {
      res.redirect('/login');
    }
};

module.exports = passport;
