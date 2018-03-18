// modules for server
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// server configurations
const serverConfigs = require('./config/serverConfig');

mongoose.connect(serverConfigs.DBURL, { useMongoClient: true });

// initialize express
const app = express();

// apply express configs
require('./backend/express')(app, serverConfigs);

module.exports = app;