export type PizzaType = 'thin' | 'traditional';

export type PizzaSize = 'S' | 'M' | 'L';

export type SortType = 'price' | 'alphabetical';

export type PizzaCategories =
  | 'all'
  | 'meat'
  | 'vegetarian'
  | 'grill'
  | 'spicy'
  | 'closed';

interface InStockInfo {
  inStock: boolean;
  price: number;
}

interface TypePriceInfo {
  name: PizzaType;
  price: number;
}

interface SizePriceInfo {
  name: PizzaSize;
  price: number;
}

interface IPizza {
  id: string;
  name: string;
  imgUrl: string;
}

export interface ICatalogPizza extends IPizza {
  types: Record<PizzaType, InStockInfo>;
  sizes: Record<PizzaSize, InStockInfo>;
  categories: PizzaCategories[];
}

export interface ICartPizza extends IPizza {
  typeInfo: TypePriceInfo;
  sizeInfo: SizePriceInfo;
  count: number;
}
