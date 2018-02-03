'use strict';

const express = require( 'express'),
      config         = require('config'),
      TechstarBot      = require('intelligo');

const app = express();


const bot = new TechstarBot({
  PAGE_ACCESS_TOKEN: (process.env.PAGE_ACCESS_TOKEN) ? (process.env.PAGE_ACCESS_TOKEN) : config.get('PAGE_ACCESS_TOKEN'),
  VALIDATION_TOKEN: (process.env.VALIDATION_TOKEN) ? (process.env.VALIDATION_TOKEN) : config.get('VALIDATION_TOKEN'),
  APP_SECRET: (process.env.APP_SECRET) ? (process.env.APP_SECRET) : config.get('APP_SECRET'),
  api: 'https://techstar-bot-tortuvshin.c9users.io/api/data',
  app: app
});
bot.initWebhook();

bot.setGreeting("Hi I am Techstar AI Bot Test")

module.exports = app;