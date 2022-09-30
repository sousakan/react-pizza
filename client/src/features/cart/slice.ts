import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  addToCart,
  cleanCart,
  decrementById,
  fetchCart,
  incrementById,
  removeFromCart,
} from './asyncActions';
import { selectById } from './selectors';

import getCartPizzaId from '../../helpers/getCartPizzaId';

import {
  ICartPizza,
  ICatalogPizza,
  PizzaSize,
  PizzaType,
} from '../../types/Pizza';

const initialState: ICartPizza[] = [];

export function createCartPizza(
  catalogPizza: ICatalogPizza,
  activeType: PizzaType,
  activeSize: PizzaSize,
): ICartPizza {
  return {
    id: getCartPizzaId(catalogPizza.name, activeType, activeSize),
    name: catalogPizza.name,
    imgUrl: catalogPizza.imgUrl,
    typeInfo: {
      name: activeType,
      price: catalogPizza.types[activeType].price,
    },
    sizeInfo: {
      name: activeSize,
      price: catalogPizza.sizes[activeSize].price,
    },
    count: 1,
  };
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cleanCartSync() {
      return [];
    },
    addToCartSync(state, action: PayloadAction<ICartPizza>) {
      state.push(action.payload);
    },
    removeFromCartSync(state, action: PayloadAction<string>) {
      const cartPizzaId = action.payload;

      return state.filter((e) => e.id !== cartPizzaId);
    },
    incrementByIdSync(state, action: PayloadAction<string>) {
      const cartPizzaId = action.payload;
      const cartPizza = selectById(state, cartPizzaId);

      if (cartPizza) cartPizza.count++;
      else throw Error('Не удалось найти пиццу.');
    },
    decrementByIdSync(state, action: PayloadAction<string>) {
      const cartPizzaId = action.payload;
      const cartPizza = selectById(state, cartPizzaId);

      if (cartPizza) cartPizza.count--;
      else throw Error('Не удалось найти пиццу.');
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(fetchCart.rejected, (state, action) => {
      alert('Не удалось загрузить корзину.');
      alert(action.error.message);
    });

    builder.addCase(cleanCart.rejected, (state, action) => {
      alert('Не удалось очистить корзину. Обновите страницу.');
    });

    builder.addCase(addToCart.rejected, (state, action) => {
      const cartPizza: ICartPizza = action.meta.arg;

      alert('Не удалось добавить в корзину');
      alert(action.error.message);

      return state.filter((e) => e.id !== cartPizza.id);
    });

    builder.addCase(removeFromCart.rejected, (state, action) => {
      const cartPizzaId: string = action.meta.arg;
      const cartPizza = selectById(state, cartPizzaId);

      if (cartPizza === undefined) throw Error('Не удалось удалить из корзины');

      state.push(cartPizza);

      alert('Не удалось удалить из корзины');
      alert(action.error.message);
    });

    builder.addCase(incrementById.rejected, (state, action) => {
      const cartPizzaId: string = action.meta.arg;
      const cartPizza = selectById(state, cartPizzaId);

      if (cartPizza === undefined)
        throw Error('Не удалось увеличить количество товара');

      cartPizza.count--;

      alert('Не удалось увеличить количество товара');
      alert(action.error.message);
    });

    builder.addCase(decrementById.rejected, (state, action) => {
      const cartPizzaId: string = action.meta.arg;
      const cartPizza = selectById(state, cartPizzaId);

      if (cartPizza === undefined)
        throw Error('Не удалось уменьшить количество товара');

      cartPizza.count++;

      alert('Не удалось уменьшить количество товара');
      alert(action.error.message);
    });
  },
});

export default cartSlice.reducer;
