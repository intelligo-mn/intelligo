import { MessengerBot } from 'intelligo';

const bot = new MessengerBot({
  PAGE_ACCESS_TOKEN: '',
  VALIDATION_TOKEN: '',
  APP_SECRET: ''
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
