export interface CreateProductDTO {
  title: string;
  image: string;
  description: string;
  price: number;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
