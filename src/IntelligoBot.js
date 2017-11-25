'use strict';
const EventEmitter = require('eventemitter3');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

class IntelligoBot extends EventEmitter {
  constructor(options) {
    super();
  }
}

module.exports = IntelligoBot;