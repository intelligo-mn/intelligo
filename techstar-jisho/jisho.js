'use strict';

const express = require( 'express'),
      expressLayouts = require('express-ejs-layouts'),
      path           = require('path'),
      morgan         = require('morgan'),
      bodyParser     = require('body-parser'), 
      mongoose       = require('mongoose'),
      cookieParser   = require('cookie-parser'),
      config         = require('config'),
      session        = require('express-session'),
      flash          = require('connect-flash'),
      expressValidator = require('express-validator'),
      passport       = require("passport");

const app = express();

const DB_JISHO = (process.env.DB_JISHO) ?
  (process.env.DB_JISHO) :
  config.get('DB_JISHO');
  
const SECRET = (process.env.SECRET) ?
  (process.env.SECRET) :
  config.get('SECRET');
  
app.set('port', process.env.PORT || 5000);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
  secret: SECRET, 
  cookie: { maxAge: 604800000 },
  resave: false,   
  saveUninitialized: false 
}));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));     
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(expressLayouts);
    
mongoose.connect(DB_JISHO, { useMongoClient: true });

app.use(expressValidator());

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/routes.js')(app, passport);

module.exports = app;
