var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override'); 
const session = require('express-session');
const passport = require('passport'); 

require('dotenv').config(); 
require('./config/database');
require('./config/passport'); 

var indexRouter = require('./routes/index');
const puzzlesRouter = require('./routes/puzzles');
const messagesRouter = require('./routes/messages'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method")); 
app.use(session({
  secret: process.env.SECRET, 
  resave: false, 
  saveUninitialized: true
}));
app.use(passport.initialize()); 
app.use(passport.session()); 

app.use(function(req, res, next){
  res.locals.user = req.user; 
  next(); 
});

const Message = require('./models/message');
app.use(async function(req, res, next) {
  req.unreadCount = 0;
  res.locals.unreadCount = 0;
  if (!req.user) return next();
  const messages = await Message.find({
    $or: [{owner: req.user._id}, {requester: req.user._id} ],
    read: false
  });
  let count = 0;
  messages.forEach(function(msg) {
    msg.replies.forEach(function(reply) { 
      count += reply.user.equals(req.user._id) ? 0 : 1;
    });
  });
  req.unreadCount = count;
  res.locals.unreadCount = count;
  next();
});

const isLoggedIn = require('./config/auth');

app.use('/', indexRouter);
app.use('/puzzles', puzzlesRouter);
app.use('/', isLoggedIn, messagesRouter); 

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
