import { Observable } from 'rxjs';
import {
  BaseProduct,
  BaseProductPrice,
  BaseProductInventory,
  BaseProductOption
} from '../models';

/**
 * Product Service Interface
 */
interface IProduct {
  allBaseProducts(): Observable<BaseProduct[]>;

  baseProductbyId(id: number): Observable<BaseProduct>;

  allBaseProductOptions(): Observable<BaseProductOption[]>;

  baseProductOptionsbyId(id: number): Observable<BaseProductOption>;

  allBaseProductPrice(): Observable<BaseProductPrice[]>;

  baseProductPricebyId(id: number): Observable<BaseProductPrice>;

  allBaseProductInventory(): Observable<BaseProductInventory[]>;

  baseProductInventorybyId(id: number): Observable<BaseProductInventory>;

  getProductOptionPricebyId(id: number): Observable<BaseProductPrice[]>;
}

export default IProduct;
