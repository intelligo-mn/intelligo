var express = require("express");

// Root Express App
// ----------------

var app = express();

// Sub-Apps
// --------
var api = require("../api/app");
var console = require("../console/app");
var tersely = require("../tersely/app");
var traffic = require("../traffic/server/server");

app.use("/", console);
app.use("/api", api);
app.use("/tersely", tersely);
app.use("/traffic", traffic);
// Exports
// -------

module.exports = app;