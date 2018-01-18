'use strict';

const express = require( 'express'),
      config         = require('config'),
      websites         = require('./websites'),
      TechstarBot      = require('techstar-uptime');

const app = express();

const bot = new TechstarBot({
  SLACK_WEBHOOK_URL: config.get('SLACK_WEBHOOK_URL')
});
bot.monitor(websites);

module.exports = app;