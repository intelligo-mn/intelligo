import { Model } from 'mongoose';
import { Product } from '../types/product';
import { User } from '../types/user';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<Product>);
    findAll(): Promise<Product[]>;
    findByOwner(userId: string): Promise<Product[]>;
    findById(id: string): Promise<Product>;
    create(productDTO: CreateProductDTO, user: User): Promise<Product>;
    update(id: string, productDTO: UpdateProductDTO, userId: string): Promise<Product>;
    delete(id: string, userId: string): Promise<Product>;
}
