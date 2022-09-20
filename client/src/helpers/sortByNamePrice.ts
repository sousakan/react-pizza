import minPrice from './minPrice';

import { ICatalogPizza, SortType } from '../types/Pizza';

export default function sortByNamePrice(
  list: ICatalogPizza[],
  sortType: SortType,
  sortOrder: boolean,
): ICatalogPizza[] {
  const newList = [...list];

  switch (sortType) {
    case 'alphabetical':
      newList.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'price':
      newList.sort((a, b) => minPrice(a) - minPrice(b));
      break;
  }

  return sortOrder ? newList : newList.reverse();
}
