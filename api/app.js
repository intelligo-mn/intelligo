var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var routes = require("./routes");

// API Express App
// ---------------

var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
// ------

app.use("/", routes);

// Exports
// -------

module.exports = app;