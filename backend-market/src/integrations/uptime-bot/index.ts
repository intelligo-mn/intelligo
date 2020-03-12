import { Uptime } from 'uptime.js';
import { NextFunction, Request, Response } from 'express';

export const uptimeBot = (req: Request, res: Response, next: NextFunction) => {
  const uptime = new Uptime({
    SLACK_WEBHOOK_URL:
      'https://hooks.slack.com/services/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',
  });

  uptime.monitor([
    {
      url: 'https://www.intelligo.systems', // URL of service we'll be pining
      timeout: 200, // threshold in milliseconds above which is considered degraded performance
    },
    {
      url: 'https://www.chatbots.mn', // URL of service we'll be pining
      timeout: 200, // threshold in milliseconds above which is considered degraded performance
    },
    {
      url: 'https://app.chatbots.mn', // URL of service we'll be pining
      timeout: 200, // threshold in milliseconds above which is considered degraded performance
    },
    {
      url: 'https://app.chatbots.mn', // URL of service we'll be pining
      timeout: 200, // threshold in milliseconds above which is considered degraded performance
    },
    {
      url: 'https://api.intelligo.systems', // URL of service we'll be pining
      timeout: 200, // threshold in milliseconds above which is considered degraded performance
    },
  ]);
  next();
};
