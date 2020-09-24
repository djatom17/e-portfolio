var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const config = require("config");

var cors = require("cors");
var busboy = require("connect-busboy");
var busboyBodyParser = require("busboy-body-parser");

//var indexRouter = require('./routes/index');
//var s3u = require('./routes/api/s3upload');

// DB connect
const mongoose = require("mongoose");
const db = config.get("mongoURI");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("[Mongoose] MongoDB Connected"))
  .catch((err) => console.log(err));

var app = express();

app.use(cors());
app.use(busboy());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(busboyBodyParser());

// upload API (?)...
//require('./routes/api/file')(app);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/../build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../build", "index.html"));
});

//app.use('/', indexRouter);
app.use("/image", require("./routes/api/s3"));
app.use("/info", require("./routes/api/mongo"));
app.use("/api/auth", require("./routes/api/userAuth"));
app.use('/my-profile', require("./routes/api/myProfile"));
//app.use('/s3proxy', s3u);

// Handle React routing, return all requests to React app
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/../build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;