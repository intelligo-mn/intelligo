'use strict';

const express = require( 'express'),
      config         = require('config'),
      TechstarBot      = require('intelligo');

const app = express();

const bot = new TechstarBot({
  accessToken: config.get('PAGE_ACCESS_TOKEN'),
  verifyToken: config.get('VALIDATION_TOKEN'),
  appSecret: config.get('APP_SECRET'),
  api: 'https://techstar-bot-tortuvshin.c9users.io/api/data',
  app: app
});
bot.initWebhook();

bot.setGreeting("Hi I am Techstar AI Bot")

module.exports = app;