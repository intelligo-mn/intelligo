var express = require("express");

// Root Express App
// ----------------

var app = express();

// Sub-Apps
// --------
var api     = require("../api/app");
var console = require("../console/app");
var url     = require("../shorter/app");
var uptime  = require("../uptime/app");

app.use("/", console);
app.use("/api", api);
app.use("/url", url);
app.use("/uptime", uptime);
// Exports
// -------

module.exports = app;