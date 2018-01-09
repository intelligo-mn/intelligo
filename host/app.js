var express = require("express");

// Root Express App
// ----------------

var app = express();

// Sub-Apps
// --------
var console = require("../console/index");

app.use("/", console);
// Exports
// -------

module.exports = app;