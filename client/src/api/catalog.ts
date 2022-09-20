import axios from './axios';

import { ICatalogPizza } from '../types/Pizza';

export const get = async () => {
  const { data: catalog } = await axios.get<ICatalogPizza[]>('/catalog');

  return catalog;
};
