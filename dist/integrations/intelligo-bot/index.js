"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intelligo_1 = require("intelligo");
const bot = new intelligo_1.MessengerBot({
    PAGE_ACCESS_TOKEN: '',
    VALIDATION_TOKEN: '',
    APP_SECRET: '',
});
bot.initWebhook();
bot.on('message', event => {
    const senderID = event.sender.id, message = event.message;
    if (message.text) {
        bot.sendTextMessage(senderID, 'Hello world');
    }
});
//# sourceMappingURL=index.js.map