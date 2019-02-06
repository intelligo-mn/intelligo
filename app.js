'use strict';

const express = require( 'express'),
      path           = require('path'),
      morgan         = require('morgan'),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      cors   = require('cors'),
      history = require('connect-history-api-fallback'),
      config         = require('config');

const app = express();

const DB_CONSOLE = (process.env.DB_CONSOLE) ?
  (process.env.DB_CONSOLE) :
  config.get('DB_CONSOLE');

const SECRET = (process.env.SECRET) ?
  (process.env.SECRET) :
  config.get('SECRET');

const SLACK_WEBHOOK_URL = (process.env.SLACK_WEBHOOK_URL) ?
  (process.env.SLACK_WEBHOOK_URL) :
  config.get('SLACK_WEBHOOK_URL');

app.set('port', process.env.PORT || 5000);
app.use(morgan('combined'));
app.use(cors())
app.use(history());
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    limit: '250mb',
    parameterLimit: 52428800,
    extended: false
}));

app.use(bodyParser.json({
    limit: '250mb'
}));

mongoose.Promise = global.Promise;
mongoose.connect(DB_CONSOLE, { useMongoClient: true });

var routes = require('./routes/routes.js');
app.use('/', routes);


app.use(require('express-status-monitor')({
    title: 'Intelligo Platform Status',
    path: '/status',
    spans: [{
      interval: 1,
      retention: 60
    }, {
      interval: 5,
      retention: 60
    }, {
      interval: 15,
      retention: 60
    }, {
      interval: 60,
      retention: 60
    }],
    chartVisibility: {
      cpu: true,
      mem: true,
      load: true,
      responseTime: true,
      rps: true,
      statusCodes: true
    }
  }
));

module.exports = app;
