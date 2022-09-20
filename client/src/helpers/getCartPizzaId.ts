import { PizzaSize, PizzaType } from '../types/Pizza';

export default function getCartPizzaId(
  name: string,
  type: PizzaType,
  size: PizzaSize,
): string {
  return name + type + size;
}
