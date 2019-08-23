import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  httpDelete,
  interfaces,
  request,
  queryParam,
  requestParam,
  response
} from 'inversify-express-utils';
import SERVICE_IDENTIFIER from '../../../common/constants/identifiers';
import { ILogger, IMetrics } from '../../../common/interfaces';
import { IScraper } from '../../interfaces';
import { APIResponse, HttpError } from '../../models';
import { ErrorResponseBuilder, HttpStatus } from '../../services';

/**
 * Controller for Scraper APIs
 */
@controller('/scraper')
class ScraperController implements interfaces.Controller {
  public scraperService: IScraper;
  public loggerService: ILogger;
  public metricsService: IMetrics;

  public constructor(
    @inject(SERVICE_IDENTIFIER.SCRAPER) scraperService: IScraper,
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger,
    @inject(SERVICE_IDENTIFIER.METRICS) metricsService: IMetrics
  ) {
    this.scraperService = scraperService;
    this.loggerService = loggerService;
    this.metricsService = metricsService;
  }

  /**
   * Get Starwars Actors by ID
   * @param id Actor ID
   * @param req Request
   * @param res Response
   */
  @httpGet('/scrape')
  public async getScraper(
    @queryParam('name') name: string,
    @queryParam('url') url: string,
    @queryParam('save') save: boolean,
    @queryParam('headless') headless: string,
    @request() req: Request,
    @response() res: Response
  ) {
    const result: APIResponse = await new Promise((resolve, reject) => {
      this.scraperService.getScrapedData(url, headless).subscribe(
        r => {
          if (r === undefined) {
            this.loggerService.logAPITrace(
              req,
              res,
              HttpStatus.INTERNAL_SERVER_ERROR
            );
            this.metricsService.logAPIMetrics(
              req,
              res,
              HttpStatus.INTERNAL_SERVER_ERROR
            );
            reject({ data: r, status: HttpStatus.INTERNAL_SERVER_ERROR });
          } else {
            this.loggerService.logAPITrace(req, res, HttpStatus.OK);
            this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
            if (save) {
              this.scraperService.pushProduct(name, {
                data: r
              });
            }
            resolve({
              data: { name, data: r },
              status: HttpStatus.OK
            });
            resolve({ data: r, status: HttpStatus.OK });
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
          this.loggerService.logAPITrace(req, res, HttpStatus.NOT_FOUND, error);
          this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
          reject({ errors: [resp], status: HttpStatus.NOT_FOUND });
        }
      );
    });
    res.status(result.status).json(result);
  }

  @httpGet('/scrapeList')
  public async scrapeByASIN(
    @queryParam('name') name: string,
    @queryParam('country') country: string,
    @queryParam('marketplace') marketplace: string,
    @queryParam('baseUrl') baseUrl: string,
    @queryParam('save') save: boolean,
    @queryParam('asinList') asinList: string,
    @queryParam('startDate') startDate: string,
    @queryParam('endDate') endDate: string,
    @queryParam('withURL') withURL: boolean,
    @request() req: Request,
    @response() res: Response
  ) {
    const currentCountry = typeof country !== 'undefined' ? country : 'IN';
    const result: APIResponse = await new Promise((resolve, reject) => {
      this.scraperService
        .getScrapedListData({ country, marketplace, baseUrl, asinList }, withURL)
        .subscribe(
          data => {
            if (data === undefined) {
              this.loggerService.logAPITrace(
                req,
                res,
                HttpStatus.INTERNAL_SERVER_ERROR
              );
              this.metricsService.logAPIMetrics(
                req,
                res,
                HttpStatus.INTERNAL_SERVER_ERROR
              );
              reject({ data, status: HttpStatus.INTERNAL_SERVER_ERROR });
            } else {
              this.loggerService.logAPITrace(req, res, HttpStatus.OK);
              this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
              if (save) {
                this.scraperService.push(name, {
                  data,
                  theme: '{}',
                  country: currentCountry,
                  visibility: {
                    startDate,
                    endDate
                  }
                });
              }
              resolve({
                data: { name, data, country: currentCountry },
                status: HttpStatus.OK
              });
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
            this.loggerService.logAPITrace(
              req,
              res,
              HttpStatus.NOT_FOUND,
              error
            );
            this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
            reject({ errors: [resp], status: HttpStatus.NOT_FOUND });
          }
        );
    });
    res.status(result.status).json(result);
  }

  @httpGet('/publish')
  public async getPublishedSite(
    @request() req: Request,
    @response() res: Response
  ) {
    const result: APIResponse = await new Promise((resolve, reject) => {
      this.scraperService.getAllSites().subscribe(
        r => {
          if (r === undefined) {
            this.loggerService.logAPITrace(
              req,
              res,
              HttpStatus.INTERNAL_SERVER_ERROR
            );
            this.metricsService.logAPIMetrics(
              req,
              res,
              HttpStatus.INTERNAL_SERVER_ERROR
            );
            reject({ data: r, status: HttpStatus.INTERNAL_SERVER_ERROR });
          } else {
            this.loggerService.logAPITrace(req, res, HttpStatus.OK);
            this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
            resolve({ data: r, status: HttpStatus.OK });
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
          this.loggerService.logAPITrace(req, res, HttpStatus.NOT_FOUND, error);
          this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
          reject({ errors: [resp], status: HttpStatus.NOT_FOUND });
        }
      );
    });
    res.status(result.status).json(result);
  }

  @httpGet('/products')
  public async getProducts(@request() req: Request, @response() res: Response) {
    const result: APIResponse = await new Promise((resolve, reject) => {
      this.scraperService.getAll().subscribe(
        r => {
          if (r === undefined) {
            this.loggerService.logAPITrace(
              req,
              res,
              HttpStatus.INTERNAL_SERVER_ERROR
            );
            this.metricsService.logAPIMetrics(
              req,
              res,
              HttpStatus.INTERNAL_SERVER_ERROR
            );
            reject({ data: r, status: HttpStatus.INTERNAL_SERVER_ERROR });
          } else {
            this.loggerService.logAPITrace(req, res, HttpStatus.OK);
            this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
            resolve({ data: r, status: HttpStatus.OK });
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
          this.loggerService.logAPITrace(req, res, HttpStatus.NOT_FOUND, error);
          this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
          reject({ errors: [resp], status: HttpStatus.NOT_FOUND });
        }
      );
    });
    res.status(result.status).json(result);
  }

  @httpPost('/publish')
  public async pushSite(@request() req: Request, @response() res: Response) {
    const result: APIResponse = await new Promise((resolve, reject) => {
      const { name, data } = req.body;
      this.loggerService.info(name);
      this.scraperService.pushSite(name, data).subscribe(
        r => {
          if (r === undefined) {
            this.loggerService.logAPITrace(
              req,
              res,
              HttpStatus.INTERNAL_SERVER_ERROR
            );
            this.metricsService.logAPIMetrics(
              req,
              res,
              HttpStatus.INTERNAL_SERVER_ERROR
            );
            reject({ data: r, status: HttpStatus.INTERNAL_SERVER_ERROR });
          } else {
            this.loggerService.logAPITrace(req, res, HttpStatus.OK);
            this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
            resolve({ data: r, status: HttpStatus.OK });
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
          this.loggerService.logAPITrace(req, res, HttpStatus.NOT_FOUND, error);
          this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
          reject({ errors: [resp], status: HttpStatus.NOT_FOUND });
        }
      );
    });
    res.status(result.status).json(result);
  }

  @httpPost('/products')
  public async push(@request() req: Request, @response() res: Response) {
    const result: APIResponse = await new Promise((resolve, reject) => {
      const { name, data, theme, country, visibility, status, ctaLinks } = req.body;
      this.loggerService.info(name);
      this.scraperService
        .push(name, { data, theme, country, visibility, status, ctaLinks }, true)
        .subscribe(
          r => {
            if (r === undefined) {
              this.loggerService.logAPITrace(
                req,
                res,
                HttpStatus.INTERNAL_SERVER_ERROR
              );
              this.metricsService.logAPIMetrics(
                req,
                res,
                HttpStatus.INTERNAL_SERVER_ERROR
              );
              reject({ data: r, status: HttpStatus.INTERNAL_SERVER_ERROR });
            } else {
              this.loggerService.logAPITrace(req, res, HttpStatus.OK);
              this.metricsService.logAPIMetrics(req, res, HttpStatus.OK);
              resolve({ data: r, status: HttpStatus.OK });
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
            this.loggerService.logAPITrace(
              req,
              res,
              HttpStatus.NOT_FOUND,
              error
            );
            this.metricsService.logAPIMetrics(req, res, HttpStatus.NOT_FOUND);
            reject({ errors: [resp], status: HttpStatus.NOT_FOUND });
          }
        );
    });
    res.status(result.status).json(result);
  }

  @httpGet('/publish/:name')
  public async byPublishedMicrositeByName(
    @requestParam('name') name: string,
    @request() req: Request,
    @response() res: Response
  ) {
    return new Promise((resolve, reject) => {
      this.scraperService.byPublishedMicrositeByID(name).subscribe(
        result => {
          this.loggerService.info(result.timings);
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

  @httpDelete('/publish/:name')
  public async deleteCampaignPublishByName(
    @requestParam('name') name: string,
    @request() req: Request,
    @response() res: Response
  ) {
    return new Promise((resolve, reject) => {
      this.scraperService.deleteMicrositePublishByID(name).subscribe(
        result => {
          this.loggerService.info(result.timings);
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


  @httpDelete('/products/:name')
  public async deleteCampaignByName(
    @requestParam('name') name: string,
    @request() req: Request,
    @response() res: Response
  ) {
    return new Promise((resolve, reject) => {
      this.scraperService.deleteMicrositeByID(name).subscribe(
        result => {
          this.loggerService.info(result.timings);
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

  @httpGet('/products/:name')
  public async byMicrositeByName(
    @requestParam('name') name: string,
    @request() req: Request,
    @response() res: Response
  ) {
    return new Promise((resolve, reject) => {
      this.scraperService.byMicrositeByID(name).subscribe(
        result => {
          this.loggerService.info(result.timings);
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
export default ScraperController;
