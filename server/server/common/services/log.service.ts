import { Request, Response } from 'express';
import { injectable } from 'inversify';

import ILogger from '../interfaces/ilogger';
const pino = require('pino')();

/**
 * Logging Facade that wraps the Pino logger implementation
 */
@injectable()
class LogService implements ILogger {
  private logger: any;
  private uuid: string;

  public constructor() {
    // do something construct...
    this.initLogger();
  }

  public getLogger(): any {
    return this.logger;
  }

  public info(...message) {
    const UUID = this.getUUID();
    this.logger.info({ UUID, data: { ...message } });
  }

  public debug(...message) {
    const UUID = this.getUUID();
    this.logger.debug({ UUID, data: { ...message } });
  }

  public error(...message) {
    const UUID = this.getUUID();
    this.logger.error({ UUID, data: { ...message } });
  }

  /**
   * Since the express response time middleware is enabled
   * x-response-time gets set and that along with the UUID
   * is added to the log
   * @param req
   * @param res
   * @param message
   */
  public logAPITraceOut(req: Request, res: Response, message?: any) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const responseTime = res.getHeader('x-response-time');
    const status = res.status;
    const uuid = this.getUUID();
    if (message !== undefined) {
      this.logger.info({ uuid, fullUrl, status, responseTime, message });
    } else {
      this.logger.info({ uuid, fullUrl, status, responseTime });
    }
  }

  public logAPITrace(
    req: Request,
    res: Response,
    statusCode: number,
    message?: any
  ) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const responseTime = res.getHeader('x-response-time');
    const uuid = this.getUUID();
    if (message !== undefined) {
      this.logger.info({ uuid, fullUrl, statusCode, responseTime, message });
    } else {
      this.logger.info({ uuid, fullUrl, statusCode, responseTime });
    }
  }

  public setUUID(uuid: string) {
    this.uuid = uuid;
  }

  public getUUID() {
    return this.uuid;
  }

  private initLogger() {
    this.logger = pino;
  }
}

export default LogService;
