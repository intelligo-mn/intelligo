# Intelligo AI chatbot framework

[![NPM](https://nodei.co/npm/intelligo.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/intelligo/)

Intelligo is a JavaScript Framework to build Facebook Messenger's Chat bots.

# Installation 

```
npm install intelligo --save
```

# Usage

```js
'use strict';

const Intelligo = require('intelligo'),
      config = require( 'config'),
      request = require( 'request');

const bot = new Intelligo({
  accessToken: config.get('pageAccessToken'),
  verifyToken: config.get('validationToken'),
  appSecret: config.get('appSecret')
});

bot.start(8000);

```
