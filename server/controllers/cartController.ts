import { Request, Response } from 'express';

import cartModel from '../models/cartModel';

const getCart = (req: Request, res: Response) => {
  cartModel.getCart().then((cart) => res.json(cart));
};

const addPizzaToCart = (req: Request, res: Response) => {
  const cartPizza = req.body;
  cartModel.addPizza(cartPizza).then((msg) => res.send(msg));
};

const removePizzaFromCart = (req: Request, res: Response) => {
  const cartPizzaId = req.params.cartPizzaId;
  cartModel.removePizza(cartPizzaId).then((msg) => res.send(msg));
};

const incrementCartPizza = (req: Request, res: Response) => {
  const cartPizzaId = req.params.cartPizzaId;
  cartModel.incrementPizza(cartPizzaId).then((msg) => res.send(msg));
};

const decrementCartPizza = (req: Request, res: Response) => {
  const cartPizzaId = req.params.cartPizzaId;
  cartModel.decrementPizza(cartPizzaId).then((msg) => res.send(msg));
};

const clearCart = (req: Request, res: Response) => {
  cartModel.clearCart().then((msg) => res.send(msg));
};

const cartController = {
  getCart,
  addPizzaToCart,
  removePizzaFromCart,
  incrementCartPizza,
  decrementCartPizza,
  clearCart,
};

export default cartController;
