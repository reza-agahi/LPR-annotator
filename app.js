var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

// import routes
var index = require('./routes/routeIndex');
var login = require('./routes/routeLogin');
var profile = require('./routes/routeProfile');
var logout = require('./routes/routeLogout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-compass')({mode: 'expanded'}));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// TODO: replace input object with correct one to correctly addressing sass and css dirs
// app.use(express.static(path.join(__dirname, 'public')));

// index
app.use('/', index);

// authentication
app.use(passport.initialize());
app.use(passport.session());
app.use('/login', login);
app.use('/profile', profile);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
