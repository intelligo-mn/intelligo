import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as csrf from 'csurf';

/**
 * Add Security Settings for the Express App
 * @param app Express App
 */
export const secureApp = (app: express.Application) => {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000
    })
  );
  app.use(helmet());
  app.use(cookieParser(process.env.SESSION_SECRET));
  //   app.use(logger(bunyanOpts));
  app.use(bodyParser.urlencoded({ extended: true }));

  if (process.env.NODE_ENV === 'production' && process.env.CORS === 'true') {
    app.use(csrf({ cookie: true }));
  }

  app.use((req: any, res, next) => {
    // write the csrf cookie in the response in the ‘XSRF-TOKEN’ field
    // The client must pass 'x-xsrf-token' or 'x-csrf-token'
    // or 'xsrf-token' or 'csrf-token' in the header with the value set
    if (process.env.NODE_ENV === 'production' && process.env.CORS === 'true') {
      res.cookie('XSRF-TOKEN', req.csrfToken());
    }
    next();
  });
};
