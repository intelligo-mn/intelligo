var subdomain = require("express-subdomain");
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
var errors  = require("../errors/app");

app.use("/", console);
app.use("/api", api);
app.use(subdomain("/url", url));
app.use("/uptime", uptime);
app.use(errors);
// Exports
// -------

module.exports = app;