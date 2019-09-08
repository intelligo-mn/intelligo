import { Observable } from 'rxjs';
import {
  IProduct
} from '../models';

/**
 * Product Service Interface
 */
interface IProductService {
  allBaseProducts(): Observable<IProduct[]>;

  baseProductbyId(id: number): Observable<IProduct>;

  allBaseProductOptions(): Observable<IProduct[]>;

  baseProductOptionsbyId(id: number): Observable<IProduct>;

  allBaseProductPrice(): Observable<IProduct[]>;

  baseProductPricebyId(id: number): Observable<IProduct>;

  allBaseProductInventory(): Observable<IProduct[]>;

  baseProductInventorybyId(id: number): Observable<IProduct>;

  getProductOptionPricebyId(id: number): Observable<IProduct[]>;
}

export default IProductService;
