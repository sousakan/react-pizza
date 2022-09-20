import { ICartPizza } from '../types/Pizza';

export default function calcCartSize(cartPizzas: ICartPizza[]) {
  return cartPizzas.reduce((acc, e) => acc + e.count, 0);
}
