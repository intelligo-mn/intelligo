import * as express from 'express';
import * as partialResponse from 'express-partial-response';
import * as path from 'path';
import {
  swaggerify,
  secureApp,
  configLogging,
  configMetrics,
  configHealthChecks,
  addCompression
} from './config';
import { IOCContainer } from './config/ioc_config';
import { InversifyExpressServer } from 'inversify-express-utils';

const responseTime = require('response-time');

/**
 * Node Express Server setup and configuration
 */
export default class ExpressServer {
  public server: InversifyExpressServer;

  constructor() {
    let root: string;

    // Setup application root
    root =
      process.env.NODE_ENV === 'development'
        ? path.normalize(__dirname + '/../..')
        : path.normalize('.');
    const container = IOCContainer.getInstance().getContainer();
    this.server = new InversifyExpressServer(container, undefined, {
      rootPath: '/api/v1'
    });
    this.server.setConfig(app => {
      // Add security configuration
      secureApp(app);

      app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
      });

      // Add public folder
      app.use(express.static(`${root}/public`));

      // Add response time support
      // This will add x-response-time to the response headers
      app.use(responseTime({ suffix: false }));

      // Add partial response support
      app.use(partialResponse());

      // Add logging configuration
      configLogging(app);

      // Add metrics configuration
      configMetrics(app);

      // Configure Healthchecks
      configHealthChecks(app);

      // Add Compression support
      addCompression(app);

      // Add swagger support
      swaggerify(app);
    });
  }

  public getServer = (): InversifyExpressServer => {
    return this.server;
  };
}
