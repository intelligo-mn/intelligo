var express = require('express');

// Root Express App

var app = express();

// Sub-Apps

var console = require('../console/app');
var errors  = require('../handler/app');
var uptime  = require('./uptime');

app.use('/', console);
app.use('/uptime', uptime);
app.use(errors);

module.exports = app;