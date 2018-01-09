var express = require("express");

// Root Express App
// ----------------

var app = express();

// Sub-Apps
// --------
var api = require("../api/app");
var console = require("../console/app");
var url = require("../url/app");

app.use("/", console);
app.use("/api", api);
app.use("/url", url);
// Exports
// -------

module.exports = app;