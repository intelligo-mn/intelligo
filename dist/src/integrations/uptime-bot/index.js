"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uptime_js_1 = require("uptime.js");
exports.uptimeBot = (req, res, next) => {
    const uptime = new uptime_js_1.Uptime({
        SLACK_WEBHOOK_URL: 'https://hooks.slack.com/services/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',
    });
    uptime.monitor([
        {
            url: 'https://www.intelligo.systems',
            timeout: 200,
        },
        {
            url: 'https://www.chatbots.mn',
            timeout: 200,
        },
        {
            url: 'https://app.chatbots.mn',
            timeout: 200,
        },
        {
            url: 'https://app.chatbots.mn',
            timeout: 200,
        },
        {
            url: 'https://api.intelligo.systems',
            timeout: 200,
        },
    ]);
    next();
};
//# sourceMappingURL=index.js.map