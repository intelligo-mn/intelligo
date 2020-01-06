import { Product } from '../types/product';
import { User as UserDocument } from '../types/user';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    listAll(): Promise<Product[]>;
    listMine(user: UserDocument): Promise<Product[]>;
    listBySeller(id: string): Promise<Product[]>;
    create(product: CreateProductDTO, user: UserDocument): Promise<Product>;
    read(id: string): Promise<Product>;
    update(id: string, product: UpdateProductDTO, user: UserDocument): Promise<Product>;
    delete(id: string, user: UserDocument): Promise<Product>;
}
