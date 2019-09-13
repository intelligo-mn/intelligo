import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  interfaces,
  request,
  requestParam,
  response
} from 'inversify-express-utils';
import SERVICE_IDENTIFIER from '../../../common/constants/identifiers';
import { ILogger, IMetrics } from '../../../common/interfaces';
import { IProduct } from '../../interfaces';
import { HttpError } from '../../models';
import { ErrorResponseBuilder, HttpStatus } from '../../services';

/**
 * Shop API Controller
 */
@controller('/shop')
class ShopController implements interfaces.Controller {
  public productService: IProduct;
  public loggerService: ILogger;
  public metricsService: IMetrics;

  public constructor(
    @inject(SERVICE_IDENTIFIER.PRODUCT) productService: IProduct,
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger,
    @inject(SERVICE_IDENTIFIER.METRICS) metricsService: IMetrics
  ) {
    this.productService = productService;
    this.loggerService = loggerService;
    this.metricsService = metricsService;
  }

  /**
   * Get All products
   * @param req
   * @param res
   */
  @httpGet('/products')
  public allBaseProducts(
    @request() req: Request,
    @response() res: Response
  ): void {
    this.productService.getProducts().subscribe(
      result => {
        res.status(HttpStatus.OK).json(result);
        this.loggerService.logAPITrace(req, res, HttpStatus.OK);
        this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
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
        res.status(HttpStatus.NOT_FOUND).json(resp);
        this.loggerService.logAPITrace(req, res, HttpStatus.NOT_FOUND);
        this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
      }
    );
  }

}
export default ShopController;
