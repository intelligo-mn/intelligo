import express from 'express';
import { MessengerBot } from 'intelligo';

const app = express();

const bot = new MessengerBot({
  PAGE_ACCESS_TOKEN: config.get('PAGE_ACCESS_TOKEN'),
  VALIDATION_TOKEN: config.get('VALIDATION_TOKEN'),
  APP_SECRET: config.get('APP_SECRET'),
  app: app,
});

bot.initWebhook();

//Subscribe to messages sent by the user with the bot.on() method.
bot.on('message', event => {
  const senderID = event.sender.id,
    message = event.message;

  if (message.text) {
    bot.sendTextMessage(senderID, 'Hello world');
  }
});
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});
