import catalog from '../data/catalog';
import { ICatalogPizza } from '../types/Pizza';

const getCatalog = () => {
  return new Promise<ICatalogPizza[]>((resolve, reject) => {
    resolve(catalog);
  });
};

const catalogModel = { getCatalog };

export default catalogModel;
