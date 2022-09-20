import { Request, Response } from 'express';

import catalogModel from '../models/catalogModel';

const getCatalog = (req: Request, res: Response) => {
  catalogModel.getCatalog().then((catalog) => res.json(catalog));
};

const catalogController = { getCatalog };

export default catalogController;
