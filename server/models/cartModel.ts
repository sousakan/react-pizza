import { ICartPizza } from '../types/Pizza';

let cart: ICartPizza[] = [];

const NOT_EXIST_ERR = 'Пиццы с заданным id не существует.';

const getCart = () => {
  return new Promise<ICartPizza[]>((resolve, reject) => {
    resolve(cart);
  });
};

const addPizza = (cartPizza: ICartPizza) => {
  return new Promise<string>((resolve, reject) => {
    cart.push(cartPizza);
    resolve('Пицца успешно добавлена в корзину');
  });
};

const removePizza = (cartPizzaId: string) => {
  return new Promise<string>((resolve, reject) => {
    const cartPizza = cart.find((e) => e.id === cartPizzaId);

    if (cartPizza) cart = cart.filter((pizza) => pizza.id !== cartPizzaId);
    resolve('Пицца успешно удалена из корзины.');

    reject(NOT_EXIST_ERR);
  });
};

const incrementPizza = (cartPizzaId: string) => {
  return new Promise<string>((resolve, reject) => {
    const cartPizza = cart.find((e) => e.id === cartPizzaId);

    if (cartPizza) {
      cartPizza.count++;
      resolve('Количество пиццы данного типа в корзине увеличено на 1.');
    }

    reject(NOT_EXIST_ERR);
  });
};

const decrementPizza = (cartPizzaId: string) => {
  return new Promise<string>((resolve, reject) => {
    const cartPizza = cart.find((e) => e.id === cartPizzaId);

    if (cartPizza) {
      cartPizza.count--;
      resolve('Количество пиццы данного типа в корзине уменьшено на 1.');
    }

    reject(NOT_EXIST_ERR);
  });
};

const clearCart = () => {
  return new Promise<string>((resolve, reject) => {
    cart = [];
    resolve('Корзина успешно очищена.');
  });
};

const cartModel = {
  getCart,
  addPizza,
  removePizza,
  incrementPizza,
  decrementPizza,
  clearCart,
};

export default cartModel;
