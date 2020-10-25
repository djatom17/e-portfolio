var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const config =
  process.env.NODE_ENV === "development" ? require("config") : null;

var cors = require("cors");
var busboy = require("connect-busboy");
var busboyBodyParser = require("busboy-body-parser");

// DB connect
const mongoose = require("mongoose");
// var db = "";
// if (process.env.NODE_ENV === "development") {
//   if (process.env.NODE_TEST === "true") {
//     db = config.get("mongoTestURI");
//   }
//   db = config.get("mongoURI");
// } else if (process.env.NODE_ENV === "test") {
//   db = process.env.MONGODB_TEST_URI;
// } else {
//   db = process.env.MONGODB_URI;
// }
const db =
  process.env.NODE_ENV === "development"
    ? process.env.NODE_TEST === "true"
      ? config.get("mongoTestURI")
      : config.get("mongoURI")
    : process.env.NODE_ENV === "test"
    ? process.env.MONGODB_TEST_URI
    : process.env.MONGODB_URI;
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

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(busboyBodyParser());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/../build")));

app.use("/api/file", require("./routes/api/s3"));
app.use("/api/mongo", require("./routes/api/mongo").mongorouter);
app.use("/api/auth", require("./routes/api/userAuth"));
app.use("/api/my-profile", require("./routes/api/myProfile"));

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
  res.status(500).json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
