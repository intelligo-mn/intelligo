export interface CreateProductDTO {
    title: string;
    image: string;
    description: string;
    price: number;
}
export declare type UpdateProductDTO = Partial<CreateProductDTO>;
