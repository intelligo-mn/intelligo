import { BaseMiddleware } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import ILogger from '../../common/interfaces/ilogger';
import { inject, injectable } from 'inversify';

/**
 * Sample Logging Middleware implemented
 * Add this to the controller when you require automated logging
 * The examples controller uses this middleware
 */
@injectable()
class LoggerMiddleware extends BaseMiddleware {
  @inject(SERVICE_IDENTIFIER.LOGGER)
  private logger: ILogger;
  public handler(req: Request, res: Response, next: NextFunction) {
    this.logger.info(
      '[Logger Middleware]',
      { url: req.url },
      { cookies: req.headers.cookie }
    );
    next();
  }
}

export default LoggerMiddleware;
