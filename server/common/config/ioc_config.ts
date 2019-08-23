import 'reflect-metadata';
import { Container } from 'inversify';

import { LogService, MetricsService, SecurityService } from '../services';
import {
  IExample,
  IHystrixDemo,
  IProduct,
  IStarwars,
  IUser,
  IScraper
} from '../../api/interfaces';
import { ILogger, IMetrics, ISecurity } from '../interfaces';
import {
  ExamplesService,
  ProductService,
  HystrixDemoService,
  StarwarsService,
  UserService,
  ScraperService
} from '../../api/services';
import LoggerMiddleware from '../middleware/logger-middleware';
import '../../api/controllers/hystrix-demo/controller';
import '../../api/controllers/examples/controller';
import '../../api/controllers/shop/controller';
import '../../api/controllers/starwars/controller';
import '../../api/controllers/security/controller';
import '../../api/controllers/scraper/controller';
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
      container.bind<IExample>(SERVICE_IDENTIFIER.EXAMPLE).to(ExamplesService);
      container
        .bind<IHystrixDemo>(SERVICE_IDENTIFIER.HYSTRIX)
        .to(HystrixDemoService);
      container.bind<IProduct>(SERVICE_IDENTIFIER.PRODUCT).to(ProductService);
      container
        .bind<IStarwars>(SERVICE_IDENTIFIER.STARWARS)
        .to(StarwarsService);
      container.bind<IUser>(SERVICE_IDENTIFIER.USER).to(UserService);
      container.bind<IScraper>(SERVICE_IDENTIFIER.SCRAPER).to(ScraperService);
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
