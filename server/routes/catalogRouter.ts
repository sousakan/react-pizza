import { Router } from 'express';

import catalogController from '../controllers/catalogController';

const catalogRouter = Router();

catalogRouter.get('/', catalogController.getCatalog);

export default catalogRouter;
