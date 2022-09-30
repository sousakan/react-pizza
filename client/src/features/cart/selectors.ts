import { RootState } from '../../app/store';
import calcCartSize from '../../helpers/calcCartSize';
import totalPrice from '../../helpers/totalPrice';
import { ICartPizza } from '../../types/Pizza';

export const selectCartPizza = (
  state: RootState,
  cartPizzaId: string,
): ICartPizza | undefined => {
  return state.cart.find((e) => e.id === cartPizzaId);
};

export const selectCartPrice = (state: RootState) => totalPrice(state.cart);

export const selectCartSize = (state: RootState) => calcCartSize(state.cart);

export const selectById = (
  cartPizzas: ICartPizza[],
  cartPizzaId: string,
): ICartPizza | undefined => {
  return cartPizzas.find((pizza) => pizza.id === cartPizzaId);
};
