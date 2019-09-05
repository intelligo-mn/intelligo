import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  interfaces,
  request,
  response
} from 'inversify-express-utils';
import SERVICE_IDENTIFIER from '../../../common/constants/identifiers';
import { ILogger, IMetrics } from '../../../common/interfaces';
import { IHystrixDemo } from '../../interfaces';
import { HttpError } from '../../models';
import { ErrorResponseBuilder, HttpStatus } from '../../services';

/**
 * Hystrix Demo Controller
 */
@controller('/hystrix-demo')
class HystrixController implements interfaces.Controller {
  public hystrixDemoService: IHystrixDemo;
  public loggerService: ILogger;
  public metricsService: IMetrics;

  public constructor(
    @inject(SERVICE_IDENTIFIER.HYSTRIX) hystrixDemoService: IHystrixDemo,
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger,
    @inject(SERVICE_IDENTIFIER.METRICS) metricsService: IMetrics
  ) {
    this.hystrixDemoService = hystrixDemoService;
    this.loggerService = loggerService;
    this.metricsService = metricsService;
  }

  /**
   * Simulate a circuit breaker sequence
   * @param req request
   * @param res response
   */
  @httpGet('/start')
  public async start(@request() req: Request, @response() res: Response) {
    return new Promise((resolve, reject) => {
      this.hystrixDemoService.start().subscribe(r => {
        resolve(r);
      });
    });
  }

  /**
   * Get Posts from the jsonplaceholder API
   * Pass the timeout as a query parameter
   * Based on the timeout value the circuit breaker will open or close
   * @param req Request
   * @param res Response
   */
  @httpGet('/posts')
  public async posts(@request() req: Request, @response() res: Response) {
    this.loggerService.info(req.originalUrl);
    return new Promise((resolve, reject) => {
      this.hystrixDemoService.getPosts(req.query.timeOut).subscribe(
        result => {
          this.loggerService.logAPITrace(req, res, HttpStatus.OK);
          this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
          resolve(result);
        },
        err => {
          const error: HttpError = err as HttpError;
          const resp = new ErrorResponseBuilder()
            .setTitle(error.name)
            .setStatus(HttpStatus.NOT_FOUND)
            .setDetail(error.stack)
            .setMessage(error.message)
            .setSource(req.url)
            .build();
          this.loggerService.logAPITrace(req, res, HttpStatus.NOT_FOUND);
          this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
          reject(resp);
        }
      );
    });
  }
}
export default HystrixController;
