import 'reflect-metadata';
import { Container } from 'inversify';

import { LogService, MetricsService, SecurityService } from '../services';
import {
  IProduct,
  IUser
} from '../../api/interfaces';
import { ILogger, IMetrics, ISecurity } from '../interfaces';
import {
  ProductService,
  UserService
} from '../../api/services';
import LoggerMiddleware from '../middleware/logger-middleware';
import '../../api/controllers/shop/controller';
import '../../api/controllers/security/controller';
import SERVICE_IDENTIFIER from '../constants/identifiers';

/**
 * IOC Container - Singleton IOC container class
 * Initialized the IOC container and sets up all the container bindings
 */
export class IOCContainer {
  public static getInstance() {
    if (!IOCContainer.instance) {
      IOCContainer.instance = new IOCContainer();
      // Initialize the container
      const container = new Container();

      // Define service bindings
      container.bind<IProduct>(SERVICE_IDENTIFIER.PRODUCT).to(ProductService);
      
      container.bind<IUser>(SERVICE_IDENTIFIER.USER).to(UserService);
      container
        .bind<ILogger>(SERVICE_IDENTIFIER.LOGGER)
        .to(LogService)
        .inSingletonScope();
      container
        .bind<IMetrics>(SERVICE_IDENTIFIER.METRICS)
        .to(MetricsService)
        .inSingletonScope();
      container
        .bind<ISecurity>(SERVICE_IDENTIFIER.SECURITY)
        .to(SecurityService)
        .inSingletonScope();
      container
        .bind<LoggerMiddleware>(SERVICE_IDENTIFIER.LOGGER_MIDDLEWARE)
        .to(LoggerMiddleware);
      IOCContainer.instance.container = container;
    }
    return IOCContainer.instance;
  }

  private static instance: IOCContainer;
  private container: Container;
  private constructor() {}

  public getContainer(): Container {
    return this.container;
  }

  public setContainer(container: Container) {
    this.container = container;
  }
}
