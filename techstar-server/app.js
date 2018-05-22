var express = require('express');

// Root Express App

var app = express();

// Sub-Apps

var api     = require('../techstar-api/app');
var bot     = require('../techstar-bot/app');
// var blog    = require('../techstar-blog/app');
var console = require('../techstar-console/app');
var errors  = require('../techstar-handler/app');
var analytic  = require('../techstar-analytic/app');
var jisho  = require('../jisho-web/jisho');

var uptime  = require('./uptime');
var markdown  = require('../techstar-markdown/app');

app.use('/', console);
// app.use('/blog', blog);
app.use('/api', api);
app.use('/analytic', analytic);
app.use('/uptime', uptime);
app.use('/bot', bot);
app.use('/markdown', markdown);
app.use('/jisho', jisho);
app.use(errors);

module.exports = app;