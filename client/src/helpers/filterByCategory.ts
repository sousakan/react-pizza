import { ICatalogPizza, PizzaCategories } from '../types/Pizza';

export default function filterByCategory(
  list: ICatalogPizza[],
  category: PizzaCategories,
): ICatalogPizza[] {
  if (category === 'all') return list;

  return list.filter((card) => card.categories.includes(category));
}
