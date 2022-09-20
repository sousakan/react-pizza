import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import api from '../api';

import { RootState } from '../app/store';
import calcCartSize from '../helpers/calcCartSize';
import getCartPizzaId from '../helpers/getCartPizzaId';
import totalPrice from '../helpers/totalPrice';

import {
  ICartPizza,
  ICatalogPizza,
  PizzaSize,
  PizzaType,
} from '../types/Pizza';

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

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  return api.cart.get();
});

export const cleanCart = createAsyncThunk<void, void, { state: RootState }>(
  'cart/cleanCart',
  async (_: void, { dispatch, getState }) => {
    const state = getState();
    dispatch(cartSlice.actions.cleanCartSync());

    return api.cart.removeAll();
  },
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartPizza: any, { dispatch }) => {
    dispatch(cartSlice.actions.addToCartSync(cartPizza));

    return api.cart.add(cartPizza);
  },
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (cartPizzaId: string, { dispatch }) => {
    dispatch(cartSlice.actions.removeFromCartSync(cartPizzaId));

    return (await api.cart.remove(cartPizzaId)) as void;
  },
);

export const incrementById = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('cart/incrementById', async (cartPizzaId, { getState, dispatch }) => {
  dispatch(cartSlice.actions.incrementByIdSync(cartPizzaId));

  const state = getState();
  const cartPizza = selectById(state.cart, cartPizzaId);

  if (cartPizza === undefined) throw Error('Пицца не найдена');

  return (await api.cart.incrementPizza(cartPizza)) as void;
});

export const decrementById = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('cart/decrementById', async (cartPizzaId, { getState, dispatch }) => {
  dispatch(cartSlice.actions.decrementByIdSync(cartPizzaId));

  const state = getState();
  const cartPizza = selectById(state.cart, cartPizzaId);

  if (cartPizza === undefined) throw Error('Пицца не найдена');

  if (cartPizza.count <= 0) {
    dispatch(cartSlice.actions.removeFromCartSync(cartPizzaId));
    return (await api.cart.remove(cartPizza.id)) as void;
  }

  return (await api.cart.decrementPizza(cartPizza)) as void;
});

const cartSlice = createSlice({
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

export const selectCartPizza = (
  state: RootState,
  cartPizzaId: string,
): ICartPizza | undefined => {
  return state.cart.find((e) => e.id === cartPizzaId);
};

export const selectCartPrice = (state: RootState) => totalPrice(state.cart);

export const selectCartSize = (state: RootState) => calcCartSize(state.cart);

const selectById = (
  cartPizzas: ICartPizza[],
  cartPizzaId: string,
): ICartPizza | undefined => {
  return cartPizzas.find((pizza) => pizza.id === cartPizzaId);
};

export default cartSlice.reducer;
