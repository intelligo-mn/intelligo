# Intelligo AI chatbot framework

[![npm](https://img.shields.io/npm/dt/intelligo.svg)](https://github.com/techstar-inc/intelligo)
[![npm](https://img.shields.io/npm/v/intelligo.svg)](https://github.com/techstar-inc/intelligo)
[![David](https://img.shields.io/david/techstar-inc/intelligo.svg)](https://github.com/techstar-inc/intelligo)
[![GitHub followers](https://img.shields.io/github/followers/tortuvshin.svg?style=social&label=Follow)](https://github.com/tortuvshin)


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