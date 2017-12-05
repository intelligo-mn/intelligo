# Intelligo AI chatbot framework

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c7f41b9927fe4d2a9b18e564e23294cc)](https://www.codacy.com/app/tortuvshin/intelligo?utm_source=github.com&utm_medium=referral&utm_content=techstar-inc/intelligo&utm_campaign=badger)
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
