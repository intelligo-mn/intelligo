import { Observable } from "rxjs";
import { IProduct } from "../models";

/**
 * Product Service Interface
 */
interface IProductService {
  getProducts(): Observable<IProduct[]>;

  getProductbyId(id: number): Observable<IProduct>;
}

export default IProductService;
