'use strict';

const express = require( 'express'),
      config         = require('config'),
      TechstarBot      = require('intelligo');

const app = express();

const PAGE_ACCESS_TOKEN = (process.env.PAGE_ACCESS_TOKEN) ?
  (process.env.PAGE_ACCESS_TOKEN) :
  config.get('PAGE_ACCESS_TOKEN');
  
const VALIDATION_TOKEN = (process.VALIDATION_TOKEN) ?
  (process.env.VALIDATION_TOKEN) :
  config.get('VALIDATION_TOKEN');
  
const APP_SECRET = (process.env.APP_SECRET) ?
  (process.env.APP_SECRET) :
  config.get('APP_SECRET');
  
const api = (process.env.api) ?
  (process.env.api) :
  config.get('api');
  
const bot = new TechstarBot({
  PAGE_ACCESS_TOKEN: PAGE_ACCESS_TOKEN,
  VALIDATION_TOKEN: VALIDATION_TOKEN,
  APP_SECRET: APP_SECRET,
  api: api,
  app: app
});
bot.initWebhook();

bot.setGreeting("Hi I am Techstar AI Bot Test")

module.exports = app;