'use strict';

const express  = require('express'),
      config   = require('config'),
      Uptime   = require('techstar-uptime');

const app = express();

const bot = new Uptime({
  SLACK_WEBHOOK_URL: config.get('SLACK_WEBHOOK_URL')
});

bot.monitor([
  {
    url: 'https://www.intelligo.systems', // URL of service we'll be pining
    timeout: 200 // threshold in milliseconds above which is considered degraded performance
  }

]);

module.exports = app;
