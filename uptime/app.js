'use strict';

const express  = require( 'express'),
      config   = require('config'),
      websites = require('./websites'),
      Uptime   = require('techstar-uptime');

const app = express();

const bot = new Uptime({
  SLACK_WEBHOOK_URL: config.get('SLACK_WEBHOOK_URL')
});
bot.monitor(websites);

module.exports = app;