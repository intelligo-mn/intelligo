import * as express from 'express';
import * as partialResponse from 'express-partial-response';
import * as path from 'path';
import * as mongoose from 'mongoose';
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
  private MONGODB_URI = "mongodb://turtuvshin:turtuvshin1@ds211648.mlab.com:11648/chatbotsmn";
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

      this.mongo();
      
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

  private mongo() {
    const connection = mongoose.connection;
<<<<<<< HEAD
    mongoose.set('useCreateIndex', true);
=======
>>>>>>> 32bffb21f4ae884aff94bc3e90f356fff2d93ef7
    connection.on("connected", () => {
      console.log("Mongo Connection Established");
    });
    connection.on("reconnected", () => {
      console.log("Mongo Connection Reestablished");
    });
    connection.on("disconnected", () => {
      console.log("Mongo Connection Disconnected");
      console.log("Trying to reconnect to Mongo ...");
      setTimeout(() => {
        mongoose.connect(this.MONGODB_URI, {
          autoReconnect: true, keepAlive: true,
          socketTimeoutMS: 3000, connectTimeoutMS: 3000
        });
      }, 3000);
    });
    connection.on("close", () => {
      console.log("Mongo Connection Closed");
    });
    connection.on("error", (error: Error) => {
      console.log("Mongo Connection ERROR: " + error);
    });

    const run = async () => {
      await mongoose.connect(this.MONGODB_URI, {
        autoReconnect: true, keepAlive: true
      });
    };
    run().catch(error => console.error(error));
  }

  public getServer = (): InversifyExpressServer => {
    return this.server;
  };
}
