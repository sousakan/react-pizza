import { ICatalogPizza } from '../types/Pizza';

export default function filterBySearchValue(
  list: ICatalogPizza[],
  searchValue: string,
) {
  return list.filter((e) =>
    e.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
}
