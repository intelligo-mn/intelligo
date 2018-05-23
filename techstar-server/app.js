var express = require('express');

// Root Express App

var app = express();

// Sub-Apps

var bot     = require('../techstar-bot/app');
var console = require('../techstar-console/app');
var errors  = require('../techstar-handler/app');
var uptime  = require('./uptime');

app.use('/', console);
app.use('/uptime', uptime);
app.use('/bot', bot);
app.use(errors);

module.exports = app;