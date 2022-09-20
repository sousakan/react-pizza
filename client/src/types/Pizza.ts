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

export const pizzaSizeText: Record<PizzaSize, string> = {
  S: '26 см.',
  M: '30 см.',
  L: '40 см.',
};

export const pizzaTypeText: Record<PizzaType, string> = {
  thin: 'тонкое',
  traditional: 'традиционное',
};

export const pizzaCategoriesText: Record<PizzaCategories, string> = {
  all: 'Все',
  meat: 'Мясные',
  vegetarian: 'Вегетарианская',
  grill: 'Гриль',
  spicy: 'Острые',
  closed: 'Закрытые',
};

export const sortTypeText: Record<SortType, string> = {
  alphabetical: 'по алфавиту',
  price: 'по цене',
};

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

export interface TypeInStockInfo {
  name: PizzaType;
  inStock: boolean;
}

export interface SizeInStockInfo {
  name: PizzaSize;
  inStock: boolean;
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
