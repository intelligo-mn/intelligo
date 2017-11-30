const IntelligoBot = require('../');
const config = require('config');

const bot = new IntelligoBot({
  accessToken: config.get('access_token'),
  verifyToken: config.get('verify_token'),
  appSecret: config.get('app_secret')
});


bot.start();
bot.learnAI();