import { combineReducers, configureStore } from '@reduxjs/toolkit';

import cartReducer from '../slices/cartSlice';
import catalogReducer from '../slices/catalogSlice';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  cart: cartReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
