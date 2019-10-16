---
sidebar: auto
type: guide
---

<p align="center">
	<img src="https://raw.githubusercontent.com/intelligo-systems/intelligo/master/.github/intelligo-logo.png"/>
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
    <a href="https://github.com/intelligo-systems/intelligo/blob/master/LICENSE">
            <img alt="License" src="https://img.shields.io/github/license/intelligo-systems/intelligo.svg?colorB=blue&style=flat-square">
           </a>
      <a href="https://twitter.com/intent/tweet?text=Wow:&url=https://github.com/intelligo-systems/intelligo">
     <img alt="Tweet" src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social">
     </a>
</p>

## Танилцуулга

Intelligo бол хиймэл оюунтай чатбот бүтээхэд зориулсан Javascript Framework юм.

## Эхлэх

### Шаардлагатай зүйлс

- [NodeJS >= 8](https://nodejs.org/)
- [Express](https://expressjs.com/)
- Terminal болон command line багаж хэрэгсэлүүд дээр ажиллах

### Суулгах

```
npm install intelligo --save
```

## Жишээ код

```js
import express from 'express';
import { MessengerBot } from 'intelligo';

const app = express();

const bot = new MessengerBot({
  PAGE_ACCESS_TOKEN: 'PAGE_ACCESS_TOKEN',
  VALIDATION_TOKEN: 'VALIDATION_TOKEN',
  APP_SECRET: 'APP_SECRET',
  app: app,
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

## Сургах

`bot.learn()` комманд ашиглан неорон сүлжээгээ сургах боломжтой. 

```js
bot.learn([
    { input: 'I feel great about the world!', output: 'happy' },
    { input: 'The world is a terrible place!', output: 'sad' },
  ]);

var result = bot.answer('I feel great about the world!');  // 'happy'
```

#### `bot.on('message', (event));`

Ботруу мэссэж илгээх

```js
bot.on('message', (event) => {

  if (message.text) {
      const result = bot.answer(message.text);
      bot.sendTextMessage(event.sender.id, event.message);
  }
});
```

## СLI ашиглах

Бот үүсгэх хамгийн хялбар арга бол intelligo generator [`cli`](https://github.com/intelligo-systems/intelligo-cli) ашиглан ботын суурь кодыг үүсгэж ашиглах.

Суулгах заавар

```bash
$ npm install intelligo-cli -g
```
Ботын суурь код үүсгэх:

```bash
$ intelligo mybot && cd mybot
```

Тохиргооны `config/default.json` файлд шаардлагатай утгуудыг зааж өгсөний дараа бот шууд ажиллах боломжтой. Өөрийн Facebook Page болон App-ийн `ACCESS_TOKEN`, `VERIFY_TOKEN`, `APP_SECRET` гэх мэт утгуудыг ашиглана.

- `ACCESS_TOKEN:` нь App -> Products -> Messenger -> Settings -> Token Generation хэсгээс авах боломжтой
- `VERIFY_TOKEN:` нь App -> Products -> Webhooks -> Edit Subscription
- `APP_SECRET:` нь App -> Settings -> Basic -> App Secret -> Show

**Тайлбар:** Хэрэв эдгээр тохиргооны мэдээллүүдийг хэрхэн авахаа мэдэхгүй бол [Quick Start Guide](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) хэсгээс дэлгэрэнгүй харна уу.

Dependencies суулгах:

```bash
$ npm install
```

Ботоо ажиллуулах:

```bash
$ npm start
```
## Жишээ ботын кодууд

Intelligo Framework ашиглан хийсэн жишээ чатботын кодууд.

- **Hello, world** [hello world bot](https://github.com/intelligo-systems/intelligo/blob/master/samples/hello-bot) буюу энгийн Messenger bot.

- **Jisho bot** [jisho bot](https://github.com/intelligo-systems/intelligo/blob/master/samples/jisho-bot) Япон Англи орчуулагч бот [www.jisho.org](https://jisho.org/) сайтын public API ашиглан өгөгдлөө авна.


## Contributors

You may contribute in several ways like creating new features, fixing bugs, improving documentation and examples
or translating any document here to your language. [Find more information in CONTRIBUTING.md](CONTRIBUTING.md).
<a href="https://github.com/intelligo-systems/intelligo/graphs/contributors">Contributors</a>

This project exists thanks to all the people who contribute.
<a href="https://github.com/intelligo-systems/intelligo/contributors"><img src="https://opencollective.com/intelligo/contributors.svg?width=890&button=false" /></a>

## Дэмжих

 <a href='https://www.ko-fi.com/turtuvshin' target="_blank">
    <img src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=0' height='35' alt='Buy Me a Coffee at ko-fi.com' />
 </a> 
 <a href='https://www.patreon.com/turtuvshin' target="_blank">
    <img src='https://c5.patreon.com/external/logo/become_a_patron_button@2x.png' height='35' alt='Become a Patron!' />
  </a>
 <a href="https://opencollective.com/intelligo/donate" target="_blank">
  <img src="https://opencollective.com/intelligo/donate/button@2x.png?color=blue" height='35'/>
</a>

## Зохиогчийн эрх

> Copyright (C) 2019 Intelligo Systems.  
> Intelligo framework is open-sourced software licensed under the [MIT](https://opensource.org/licenses/MIT) license.  
> (See the [LICENSE](https://github.com/intelligo-systems/intelligo/blob/master/LICENSE) file for the whole license text.)
