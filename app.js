var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');

var indexRouter = require('./index');
var usersRouter = require('./routes/users');
var labRouter = require('./lab');
var itemRouter = require('./item');
var queryRouter = require('./query.js');
var upd_qRouter = require('./upd_q.js');
var contactRouter = require('./contact.js');
// var loginRouter = require('./login');

var app = express();

app.use(session({
  secret : 'labdbms',
  resave : true,
  saveUninitialized : true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/upd_q', upd_qRouter);
app.use('/contact', contactRouter);
app.use('/queries', queryRouter);
app.use('/item', itemRouter);
app.use('/lab', labRouter)
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/login', loginRouter);

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
