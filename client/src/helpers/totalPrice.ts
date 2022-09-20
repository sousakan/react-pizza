import { ICartPizza } from '../types/Pizza';

export default function totalPrice(bars: ICartPizza[]): number {
  return bars.reduce((acc, bar) => {
    return acc + (bar.sizeInfo.price + bar.typeInfo.price) * bar.count;
  }, 0);
}
