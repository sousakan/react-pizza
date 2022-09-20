import axios from './axios';

import { ICartPizza } from '../types/Pizza';

export const get = async () => {
  const { data: cart } = await axios.get<ICartPizza[]>('/cart');

  return cart;
};

export const add = async (pizza: ICartPizza) => {
  await axios.post<void>('/cart', pizza);
};

export const remove = async (cartPizzaId: string) => {
  await axios.delete<void>(`/cart/${cartPizzaId}`);
};

export const removeAll = async () => {
  await axios.delete<void>('/cart');
};

export const incrementPizza = async (pizza: ICartPizza) => {
  await axios.put<void>(`/cart/increment/${pizza.id}`, pizza);
};

export const decrementPizza = async (pizza: ICartPizza) => {
  await axios.put<void>(`/cart/decrement/${pizza.id}`, pizza);
};
