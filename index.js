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

app.listen(app.get('port'), function() {
  console.log('Bot server is running on port', app.get('port'));
});

module.exports = app;