'use strict';

const express = require( 'express'),
      port           = process.env.PORT || 8080,
      expressLayouts = require('express-ejs-layouts'),
      path           = require( 'path'),
      morgan         = require( 'morgan'),
      bodyParser     = require( 'body-parser'), 
      mongoose       = require('mongoose'),
      cookieParser   = require('cookie-parser'),
      config         = require( 'config'),
      crypto         = require( 'crypto'),
      https          = require( 'https'),
      request        = require( 'request'),
      session        = require( 'express-session'),
      services       = require('./services/service'), 
      flash          = require('connect-flash'),
      expressValidator = require('express-validator'),
      TechstarAI     = require('techstar-ai'),
      datas          = require('./app/DataController'),
      passport       = require("passport");

const app = express();

const DB_URI = (process.env.DB_URI) ?
  (process.env.DB_URI) :
  config.get('DB_URI');
  
const SECRET = (process.env.SECRET) ?
  (process.env.SECRET) :
  config.get('SECRET');
  

const SLACK_WEBHOOK_URL = (process.env.SLACK_WEBHOOK_URL) ?
  (process.env.SLACK_WEBHOOK_URL) :
  config.get('SLACK_WEBHOOK_URL');
  
console.log(datas.retDatas());

// CONFIGURATION TECHSTAR BOT APPLICATION 

app.set('port', process.env.PORT || 5000);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
  secret: SECRET, 
  cookie: { maxAge: 604800000 }, // 7 day 
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));             
app.use(express.static(__dirname + '/public'));
app.use(require('express-status-monitor')());
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Connect to database
mongoose.connect(DB_URI, { useMongoClient: true });

app.use(expressValidator());

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
// set the routes =============================
require('./routes/routes.js')(app, passport);


const pingService = (url, cb) => {
  request({
    method: 'GET',
    uri: url,
    time: true
  }, (err, res, body) => {
    if (!err && res.statusCode == 200) {
      // we'll use the time from the point we try to establish a connection with
      // the service until the first byte is received
      cb(res.timingPhases.firstByte)
    } else {
      cb('OUTAGE')
    }
  })
}

const pingInterval = 1*1000*60 // 5 minutes
let serviceStatus = {}

services.forEach(service => {
  serviceStatus[service.url] = {
    status: 'OPERATIONAL', // initialize all services as operational when we start
    responseTimes: [], // array containing the responses times for last 3 pings
    timeout: service.timeout // load up the timout from the config
  }

  setInterval(() => {
    pingService(service.url, (serviceResponse) => {
      if (serviceResponse === 'OUTAGE' && serviceStatus[service.url].status !== 'OUTAGE') {
        // only update and post to Slack on state change
        serviceStatus[service.url].status = 'OUTAGE'
        postToSlack(service.url)
      } else {
        let responseTimes = serviceStatus[service.url].responseTimes
        responseTimes.push(serviceResponse)

        // check degraded performance if we have 3 responses so we can average them
        if (responseTimes.length > 3) {
          // remove the oldest response time (beginning of array)
          responseTimes.shift()

          // compute average of last 3 response times
          let avgResTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
          let currService = serviceStatus[service.url]

          if (avgResTime > currService.timeout && currService.status !== 'DEGRADED') {
            currService.status = 'DEGRADED'
            postToSlack(service.url)
          } else if (avgResTime < currService.timeout && currService.status !== 'OPERATIONAL') {
            currService.status = 'OPERATIONAL'
            postToSlack(service.url)
          }
        }

      }
    })
  }, pingInterval)
})

const postToSlack = (serviceUrl) => {
  let slackPayload = {
    text: `*Service ${serviceStatus[serviceUrl].status}*\n${serviceUrl}`
  }

  request({
    method: 'POST',
    uri: SLACK_WEBHOOK_URL,
    body: slackPayload,
    json: true
  }, (err, res, body) => {
    if (err) console.log(`Error posting to Slack: ${err}`)
  })
}

app.listen(app.get('port'), function() {
  console.log('Bot server is running on port', app.get('port'));
});

module.exports = app;