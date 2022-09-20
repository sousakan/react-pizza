import { ICatalogPizza, PizzaSize, PizzaType } from '../types/Pizza';

export function getDefaultType(pizza: ICatalogPizza): PizzaType {
  if (pizza.types.thin.inStock) return 'thin';
  if (pizza.types.traditional.inStock) return 'traditional';

  return 'thin';
}

export function getDefaultSize(pizza: ICatalogPizza): PizzaSize {
  if (pizza.sizes.S.inStock) return 'S';
  if (pizza.sizes.M.inStock) return 'M';
  if (pizza.sizes.L.inStock) return 'L';

  return 'S';
}
