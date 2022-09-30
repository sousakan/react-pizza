import { combineReducers, configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/cart/slice';
import catalogReducer from '../features/catalog/slice';

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
