var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');
var busboy = require('connect-busboy');
var busboyBodyParser = require('busboy-body-parser');

var indexRouter = require('./routes/index');
var s3u = require('./routes/api/s3upload');

var app = express();

app.use(cors());
app.use(busboy());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(busboyBodyParser());

// upload API (?)...
//require('./routes/api/file')(app);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../build', 'index.html'))
});

// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../build', 'index.html'));
});

//app.use('/', indexRouter);
//app.use('/s3proxy', s3u);

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
