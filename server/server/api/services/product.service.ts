import { Observable, AsyncSubject, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import * as _ from 'lodash';
import { inject, injectable } from 'inversify';
import IProduct from '../interfaces/iproduct';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import ILogger from '../../common/interfaces/ilogger';
import IProductService from '../interfaces/iproduct';

/**
 * Product Service Implementation
 */
@injectable()
class ProductService implements IProductService {
 
  public loggerService: ILogger;
  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger
  ) {
    this.loggerService = loggerService;
  }

  getProducts(): Observable<import("../models").IProduct[]> {
    throw new Error("Method not implemented.");
  }
  getProductbyId(id: number): Observable<import("../models").IProduct> {
    throw new Error("Method not implemented.");
  }
}

export default ProductService;
