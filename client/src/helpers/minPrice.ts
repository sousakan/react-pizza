import { getDefaultSize, getDefaultType } from './getDefault';

import { ICatalogPizza } from '../types/Pizza';

export default function minPrice(pizza: ICatalogPizza): number {
  const size = getDefaultSize(pizza);
  const type = getDefaultType(pizza);

  return pizza.types[type].price + pizza.sizes[size].price;
}
