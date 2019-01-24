<p align="center">
	<img src="/.github/intelligo-logo.png" width="200"/>
<br>
	<b>Intelligo AI chatbot framework</b>
</p>
<p align="center">
    <a class="badge-align" href="https://www.codacy.com/app/tortuvshin/intelligo?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=techstar-inc/intelligo&amp;utm_campaign=Badge_Grade"><img src="https://api.codacy.com/project/badge/Grade/c7f41b9927fe4d2a9b18e564e23294cc"/></a>
   <a href="https://www.npmjs.com/package/intelligo">
      <img alt="npm downloads" src="https://img.shields.io/npm/dt/intelligo.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/intelligo">
        <img alt="undefined" src="https://img.shields.io/npm/v/intelligo.svg?style=flat-square">
        </a>
    <a href="https://github.com/tortuvshin/">
        <img src="https://img.shields.io/github/followers/tortuvshin.svg?style=social&label=Follow"
            alt="Followers"></a>
    <a href="https://github.com/opengineer/intelligo/blob/master/LICENSE">
            <img alt="License" src="https://img.shields.io/github/license/opengineer/intelligo.svg?colorB=blue&style=flat-square">
           </a>
      <a href="https://twitter.com/intent/tweet?text=Wow:&url=https://github.com/opengineer/intelligo">
     <img alt="Tweet" src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social">
     </a>
      
</p>


Intelligo is a JavaScript Framework to build Facebook Messenger's Chat bots.


## Installation

[![NPM](https://nodei.co/npm/intelligo.png?compact=true)](https://nodei.co/npm/intelligo/)

## Example

```js
'use strict';

const express = require('express'),
      Intelligo = require('intelligo');
      
const app = express();

const bot = new Intelligo({
  PAGE_ACCESS_TOKEN: 'PAGE_ACCESS_TOKEN',
  VALIDATION_TOKEN: 'VALIDATION_TOKEN',
  APP_SECRET: 'APP_SECRET',
  app: app
});

bot.initWebhook();

//Train the neural network with an array of training data.
bot.learn([
  { input: 'I feel great about the world!', output: 'happy' },
  { input: 'The world is a terrible place!', output: 'sad' },
]);

//Subscribe to messages sent by the user with the bot.on() method.
bot.on('message', (event) => {
   
  const senderID = event.sender.id,
        message = event.message;
      
  if (message.text) {
      const result = bot.answer(message.text);
      bot.sendTextMessage(senderID, result);
  } 
});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});
```

### Training

Use `bot.learn()` to train the neural network with an array of training data. The network has to be trained with all the data in bulk in one call to `bot.learn()`. More training patterns will probably take longer to train, but will usually result in a network better at classifying new patterns.

Example using strings with inputs and outputs:

```js
bot.learn([
    { input: 'I feel great about the world!', output: 'happy' },
    { input: 'The world is a terrible place!', output: 'sad' },
  ]);
  
var result = bot.answer('I feel great about the world!');  // 'happy'
```

#### `bot.on('message', (event));`

Triggered when a message is sent to the bot.

```js
bot.on('message', (event) => {
   
  if (message.text) {
      const result = bot.answer(message.text);
      bot.sendTextMessage(event.sender.id, event.message);
  } 
});
```

## Contributors

You may contribute in several ways like creating new features, fixing bugs, improving documentation and examples
or translating any document here to your language. [Find more information in CONTRIBUTING.md](CONTRIBUTING.md).
<a href="https://github.com/techstar-cloud/intelligo/graphs/contributors">Contributors</a>

This project exists thanks to all the people who contribute. 
<a href="https://github.com/techstar-cloud/intelligo/contributors"><img src="https://opencollective.com/intelligo/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/intelligo#backer)]

<a href="https://opencollective.com/intelligo#backers" target="_blank"><img src="https://opencollective.com/intelligo/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/intelligo#sponsor)]

<a href="https://opencollective.com/intelligo/sponsor/0/website" target="_blank"><img src="https://opencollective.com/intelligo/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/intelligo/sponsor/1/website" target="_blank"><img src="https://opencollective.com/intelligo/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/intelligo/sponsor/2/website" target="_blank"><img src="https://opencollective.com/intelligo/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/intelligo/sponsor/3/website" target="_blank"><img src="https://opencollective.com/intelligo/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/intelligo/sponsor/4/website" target="_blank"><img src="https://opencollective.com/intelligo/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/intelligo/sponsor/5/website" target="_blank"><img src="https://opencollective.com/intelligo/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/intelligo/sponsor/6/website" target="_blank"><img src="https://opencollective.com/intelligo/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/intelligo/sponsor/7/website" target="_blank"><img src="https://opencollective.com/intelligo/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/intelligo/sponsor/8/website" target="_blank"><img src="https://opencollective.com/intelligo/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/intelligo/sponsor/9/website" target="_blank"><img src="https://opencollective.com/intelligo/sponsor/9/avatar.svg"></a>



## License

> Copyright (C) 2019 Opengineer.  
> Intelligo framework is open-sourced software licensed under the [MIT](https://opensource.org/licenses/MIT) license.  
> (See the [LICENSE](https://github.com/opengineer/intelligo/blob/master/LICENSE) file for the whole license text.)

