import { Observable, AsyncSubject, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import * as _ from 'lodash';

import {
  BaseProduct,
  BaseProductPrice,
  BaseProductInventory,
  BaseProductOption
} from '../models';
import { inject, injectable } from 'inversify';
import IProduct from '../interfaces/iproduct';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import ILogger from '../../common/interfaces/ilogger';

let bpId = 0;
let bpoId = 0;
let invId = 0;
let basePrice = 100.0;
let baseInventory = 1;
let prId = 0;

const baseProductPrice: BaseProductPrice[] = [
  {
    id: prId++,
    baseProductOptionId: bpoId++,
    price: basePrice++
  },
  {
    id: prId++,
    baseProductOptionId: bpoId++,
    price: basePrice++
  },
  {
    id: prId++,
    baseProductOptionId: bpoId++,
    price: basePrice++
  },
  {
    id: prId++,
    baseProductOptionId: bpoId++,
    price: basePrice++
  },
  {
    id: prId++,
    baseProductOptionId: bpoId++,
    price: basePrice++
  },
  {
    id: prId++,
    baseProductOptionId: bpoId++,
    price: basePrice++
  }
];

bpoId = 0;

const baseProductInventory: BaseProductInventory[] = [
  {
    id: invId++,
    baseProductOptionId: bpoId++,
    inventory: baseInventory++
  },
  {
    id: invId++,
    baseProductOptionId: bpoId++,
    inventory: baseInventory++
  },
  {
    id: invId++,
    baseProductOptionId: bpoId++,
    inventory: baseInventory++
  }
];

bpoId = 0;
const baseProductOptions1: BaseProductOption[] = [
  {
    baseProductOptionId: bpoId++,
    description: 'Base product option 0'
  },
  {
    baseProductOptionId: bpoId++,
    description: 'Base product option 1'
  },
  {
    baseProductOptionId: bpoId++,
    description: 'Base product option 2'
  }
];
const baseProductOptions2: BaseProductOption[] = [
  {
    baseProductOptionId: bpoId++,
    description: 'Base product option 3'
  },
  {
    baseProductOptionId: bpoId++,
    description: 'Base product option 4'
  },
  {
    baseProductOptionId: bpoId,
    description: 'Base product option 5'
  }
];

const baseProductOptions: BaseProductOption[] = Array.prototype.concat(
  baseProductOptions1,
  baseProductOptions2
);

const baseProducts: BaseProduct[] = [
  {
    id: bpId++,
    name: 'product 0',
    description: 'product 0',
    baseProductOptions: baseProductOptions1
  },
  {
    id: bpId++,
    name: 'product 1',
    description: 'product 1',
    baseProductOptions: baseProductOptions2
  }
];

/**
 * Product Service Implementation
 */
@injectable()
class ProductService implements IProduct {
  public loggerService: ILogger;
  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger
  ) {
    this.loggerService = loggerService;
  }
  public allBaseProducts(): Observable<BaseProduct[]> {
    return of(baseProducts);
  }

  public baseProductbyId(id: number): Observable<BaseProduct> {
    const results: BaseProduct[] = _.filter(baseProducts, product => {
      // tslint:disable-next-line:triple-equals
      return product.id == id;
    });
    return of(results[0]);
  }

  public allBaseProductOptions(): Observable<BaseProductOption[]> {
    return of(baseProductOptions);
  }

  public baseProductOptionsbyId(id: number): Observable<BaseProductOption> {
    const results: BaseProductOption[] = _.filter(
      baseProductOptions,
      options => {
        // tslint:disable-next-line:triple-equals
        return options.baseProductOptionId == id;
      }
    );
    return of(results[0]);
  }

  public allBaseProductPrice(): Observable<BaseProductPrice[]> {
    return of(baseProductPrice);
  }

  public baseProductPricebyId(id: number): Observable<BaseProductPrice> {
    const results: BaseProductPrice[] = _.filter(baseProductPrice, price => {
      // tslint:disable-next-line:triple-equals
      return price.baseProductOptionId == id;
    });
    return of(results[0]);
  }

  public allBaseProductInventory(): Observable<BaseProductInventory[]> {
    return of(baseProductInventory);
  }

  public baseProductInventorybyId(
    id: number
  ): Observable<BaseProductInventory> {
    const results: BaseProductInventory[] = _.filter(
      baseProductInventory,
      inv => {
        // tslint:disable-next-line:triple-equals
        return inv.baseProductOptionId == id;
      }
    );
    return of(results[0]);
  }

  /**
   * Get Product Option Price
   * FlatMap example : Get the base product option first
   * and then get the price for the same
   * @param id Product Option ID
   */
  public getProductOptionPricebyId(id: number): Observable<BaseProductPrice[]> {
    const loadedCharacter: AsyncSubject<BaseProductPrice[]> = new AsyncSubject<
      BaseProductPrice[]
    >();
    const prices: BaseProductPrice[] = [];
    this.baseProductbyId(id)
      .pipe(
        flatMap(prod => {
          if (prod !== undefined && prod.baseProductOptions !== undefined) {
            for (const product of prod.baseProductOptions) {
              this.baseProductOptionsbyId(product.baseProductOptionId)
                .pipe(
                  flatMap(p => {
                    return this.baseProductPricebyId(p.baseProductOptionId);
                  })
                )
                .subscribe(result => {
                  prices.push(result);
                });
            }
          }
          return of(prices);
        })
      )
      .subscribe(result => {
        loadedCharacter.next(result);
        loadedCharacter.complete();
      });
    return loadedCharacter;
  }
}

export default ProductService;
