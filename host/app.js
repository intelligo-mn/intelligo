var express = require("express");

// Root Express App
// ----------------

var app = express();

// Sub-Apps
// --------
var api = require("../api/app");
var console = require("../console/app");

app.use("/", console);
app.use("/api", api);
// Exports
// -------

module.exports = app;