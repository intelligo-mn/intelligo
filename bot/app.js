'use strict';

const express = require( 'express'),
      config         = require('config'),
      TechstarBot      = require('intelligo');

const app = express();

const bot = new TechstarBot({
  accessToken: config.get('PAGE_ACCESS_TOKEN'),
  verifyToken: config.get('VALIDATION_TOKEN'),
  appSecret: config.get('APP_SECRET'),
  app: app
});
bot.initWebhook();
bot.learn('training_dataa.json');
bot.setGreeting("Hi I am Techstar AI Bot")


module.exports = app;