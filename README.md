# Intelligo AI chatbot framework

[![NPM](https://nodei.co/npm/intelligo.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/intelligo/)

Intelligo is a JavaScript Framework to build Facebook Messenger's Chat bots.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c7f41b9927fe4d2a9b18e564e23294cc)](https://www.codacy.com/app/tortuvshin/intelligo?utm_source=github.com&utm_medium=referral&utm_content=techstar-inc/intelligo&utm_campaign=badger)  
[![npm](https://img.shields.io/npm/v/intelligo.svg?style=plastic)](https://www.npmjs.com/package/intelligo)  
[![npm](https://img.shields.io/npm/dt/intelligo.svg?style=plastic)](https://www.npmjs.com/package/intelligo)  
[![GitHub license](https://img.shields.io/github/license/techstar-inc/intelligo.svg)](https://github.com/techstar-inc/intelligo/blob/master/LICENSE)  
[![Twitter](https://img.shields.io/twitter/url/https/github.com/techstar-inc/intelligo.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Ftechstar-inc%2Fintelligo)

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



