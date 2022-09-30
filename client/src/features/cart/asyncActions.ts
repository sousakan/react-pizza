import { createAsyncThunk } from '@reduxjs/toolkit';

import { selectById } from './selectors';
import { cartSlice } from './slice';

import api from '../../api';
import { RootState } from '../../app/store';

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
