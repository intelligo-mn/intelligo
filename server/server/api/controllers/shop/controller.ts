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
    this.productService.allBaseProducts().subscribe(
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

  /**
   * Get all product options for all products
   * @param req
   * @param res
   */
  @httpGet('/productOptions')
  public allBaseProductOptions(
    @request() req: Request,
    @response() res: Response
  ): void {
    this.productService.allBaseProductOptions().subscribe(
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

  /**
   * Get all product pricing per product option
   * @param req
   * @param res
   */
  @httpGet('/prices')
  public allBaseProductPrice(
    @request() req: Request,
    @response() res: Response
  ): void {
    this.productService.allBaseProductPrice().subscribe(
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

  /**
   * Get the inventory for each product option per product
   * @param req
   * @param res
   */
  @httpGet('/inventory')
  public allBaseProductInventory(
    @request() req: Request,
    @response() res: Response
  ): void {
    this.productService.allBaseProductInventory().subscribe(
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

  /**
   * Get Product by ID and then show pricing and inventory for all product options
   * in one reactive RxJS call.
   * @param id
   * @param req
   * @param res
   */
  @httpGet('/products/:id')
  public productbyId(
    @requestParam('id') id: number,
    @request() req: Request,
    @response() res: Response
  ): void {
    this.productService.baseProductbyId(id).subscribe(r => {
      if (r) {
        res.json(r);
        this.loggerService.logAPITrace(req, res, HttpStatus.OK);
        this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
      } else {
        res.status(HttpStatus.NOT_FOUND).end();
        this.loggerService.logAPITrace(req, res, HttpStatus.NOT_FOUND);
        this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
      }
    });
  }

  @httpGet('/productOptions/:id')
  public baseProductOptionsbyId(
    @requestParam('id') id: number,
    @request() req: Request,
    @response() res: Response
  ): void {
    this.productService.baseProductOptionsbyId(id).subscribe(r => {
      if (r) {
        res.json(r);
        this.loggerService.logAPITrace(req, res, HttpStatus.OK);
        this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
      } else {
        res.status(HttpStatus.NOT_FOUND).end();
        this.loggerService.logAPITrace(req, res, HttpStatus.NOT_FOUND);
        this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
      }
    });
  }

  @httpGet('/prices/:id')
  public baseProductPricebyId(
    @requestParam('id') id: number,
    @request() req: Request,
    @response() res: Response
  ): void {
    this.productService.baseProductPricebyId(id).subscribe(r => {
      if (r) {
        res.json(r);
        this.loggerService.logAPITrace(req, res, HttpStatus.OK);
        this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
      } else {
        res.status(HttpStatus.NOT_FOUND).end();
        this.loggerService.logAPITrace(req, res, HttpStatus.NOT_FOUND);
        this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
      }
    });
  }

  /**
   * Check by ID
   */
  @httpGet('/inventory/:id')
  public baseProductInventorybyId(
    @requestParam('id') id: number,
    @request() req: Request,
    @response() res: Response
  ): void {
    this.productService.baseProductInventorybyId(id).subscribe(r => {
      if (r) {
        res.json(r);
        this.loggerService.logAPITrace(req, res, HttpStatus.OK);
        this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
      } else {
        res.status(HttpStatus.NOT_FOUND).end();
        this.loggerService.logAPITrace(req, res, HttpStatus.NOT_FOUND);
        this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
      }
    });
  }

  /**
   * Get Price of product Option using flatMap
   * @param req Request Param
   * @param res Response Param
   */
  @httpGet('/priceByOptionId/:id')
  public flatMapProductOptionPricebyId(
    @requestParam('id') id: number,
    @request() req: Request,
    @response() res: Response
  ): void {
    this.productService.getProductOptionPricebyId(id).subscribe(
      r => {
        if (r) {
          res.json(r);
          this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
        } else {
          res.status(HttpStatus.NOT_FOUND).end();
          this.loggerService.logAPITrace(req, res, HttpStatus.NOT_FOUND);
          this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
        }
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
