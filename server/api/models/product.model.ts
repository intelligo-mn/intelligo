/**
 * Base Product Options Interface
 * Each Product Option has a price and inventory
 */
export interface BaseProductOption {
  baseProductOptionId: number;
  description: string;
  price?: number;
  inventory?: number;
}

/**
 * Base Product Interface
 * Each Base Product has multiple Product Options
 */
export interface BaseProduct {
  id: number;
  name: string;
  description: string;
  baseProductOptions: BaseProductOption[];
}

/**
 * Base Product Price Interface
 * Each Base Product Option has a price
 */
export interface BaseProductPrice {
  id?: number;
  baseProductOptionId: number;
  price: number;
}

/**
 * Base Product Inventory Interface
 * Each Base Product Option has an inventory number
 */
export interface BaseProductInventory {
  id: number;
  baseProductOptionId: number;
  inventory: number;
}
