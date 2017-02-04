/**
 *  Firebase libraries for browser - npm package.
 *
 * Usage:
 *
 *   firebase = require('firebase');
 */
var firebase = require('./app');
require('./auth');
require('./database');
require('./storage');
require('./messaging');
module.exports = firebase;
