var express = require("express");

// Root Express App

var app = express();

// Sub-Apps

var api     = require("../techstar-api/app");
var bot     = require("../techstar-bot/app");
var console = require("../techstar-console/app");
var url     = require("../techstar-shortener/app");
var errors  = require("../techstar-handler/app");
var analytic  = require("../techstar-analytic/app");
var uptime  = require("./uptime/app");

app.use("/", console);
app.use("/api", api);
app.use("/url", url);
app.use("/analytic", analytic);
app.use("/uptime", uptime);
app.use("/bot", bot);
app.use(errors);

module.exports = app;