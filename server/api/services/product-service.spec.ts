import IProduct from '../interfaces/iproduct';
import { IOCContainer } from '../../common/config/ioc_config';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import {
  BaseProduct,
  BaseProductPrice,
  BaseProductInventory,
  BaseProductOption
} from '../models';
import '../../common/env';

describe('Product/Shop Service Tests', () => {
  let productService: IProduct;
  beforeAll(() => {
    const container = IOCContainer.getInstance().getContainer();
    productService = container.get<IProduct>(SERVICE_IDENTIFIER.PRODUCT);
  });

  it('has all base products count as 3', done => {
    productService.allBaseProducts().subscribe((results: BaseProduct[]) => {
      expect(results.length).toEqual(2);
      results.forEach(result => {
        productService.baseProductbyId(result.id).subscribe(data => {
          expect(data.baseProductOptions.length).toEqual(3);
        });
      });
      done();
    });
  });

  it('has base product options count as six', done => {
    productService
      .allBaseProductOptions()
      .subscribe((results: BaseProductOption[]) => {
        expect(results.length).toEqual(6);
        results.forEach(result => {
          productService
            .baseProductOptionsbyId(result.baseProductOptionId)
            .subscribe(data => {
              expect(data.baseProductOptionId).toEqual(
                result.baseProductOptionId
              );
            });
        });
        done();
      });
  });

  it('has base product price item count are six', done => {
    productService
      .allBaseProductPrice()
      .subscribe((results: BaseProductPrice[]) => {
        expect(results.length).toEqual(6);
        results.forEach(result => {
          productService.baseProductPricebyId(result.id).subscribe(data => {
            expect(data.baseProductOptionId).toEqual(result.id);
          });
        });
        done();
      });
  });

  it('has base product option inventory item count are 3', done => {
    productService
      .allBaseProductInventory()
      .subscribe((results: BaseProductInventory[]) => {
        expect(results.length).toEqual(3);
        results.forEach(result => {
          productService.baseProductInventorybyId(result.id).subscribe(data => {
            expect(data.baseProductOptionId).toEqual(result.id);
          });
        });
        done();
      });
  });

  it('base product id 1 has price item count are 3', done => {
    productService
      .getProductOptionPricebyId(1)
      .subscribe((result: BaseProductPrice[]) => {
        expect(result.length).toEqual(3);
        expect(result[0].price).toEqual(103);
        done();
      });
  });

  it('base product invalid id returns empty array', done => {
    productService.getProductOptionPricebyId(100).subscribe(data => {
      expect(data.length).toBe(0);
      done();
    });
  });
});
