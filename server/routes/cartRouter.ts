import { Router } from 'express';

import cartController from '../controllers/cartController';

const cartRouter = Router();

cartRouter.get('/', cartController.getCart);
cartRouter.delete('/', cartController.clearCart);
cartRouter.post('/', cartController.addPizzaToCart);
cartRouter.delete('/:cartPizzaId', cartController.removePizzaFromCart);
cartRouter.put('/increment/:cartPizzaId', cartController.incrementCartPizza);
cartRouter.put('/decrement/:cartPizzaId', cartController.decrementCartPizza);

export default cartRouter;
