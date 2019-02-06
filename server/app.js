var express = require('express');

// Root Express App

var app = express();

// Sub-Apps

var console = require('../app');
var uptime  = require('./uptime');

app.use('/', console);
app.use('/uptime', uptime);

module.exports = app;
