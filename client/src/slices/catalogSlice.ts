import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import api from '../api';
import { RootState } from '../app/store';
import { ICatalogPizza, PizzaCategories, SortType } from '../types/Pizza';

interface Initial {
  list: ICatalogPizza[];
  searchValue: string;
  category: PizzaCategories;
  sortType: SortType;
  sortOrder: boolean;
  displayedListSize: number;
  pageNumber: number;
}

const initialState: Initial = {
  list: [],
  searchValue: '',
  category: 'all',
  sortType: 'alphabetical',
  sortOrder: true,
  displayedListSize: 0,
  pageNumber: 0,
};

export const fetchCatalog = createAsyncThunk('catalog/fetchCatalog', () => {
  return api.catalog.get();
});

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    updateCategory(state, action: PayloadAction<PizzaCategories>) {
      state.category = action.payload;
    },
    updateType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    changeOrder(state) {
      state.sortOrder = !state.sortOrder;
    },
    searchChanged(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.pageNumber = action.payload;
    },
    updateDisplayedListSize(state, action: PayloadAction<number>) {
      state.displayedListSize = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCatalog.fulfilled, (state, action) => {
      const isInStock = (pizza: ICatalogPizza) =>
        (pizza.types.thin.inStock || pizza.types.traditional.inStock) &&
        (pizza.sizes.S.inStock ||
          pizza.sizes.M.inStock ||
          pizza.sizes.L.inStock);

      state.list = action.payload.filter(isInStock);
      state.displayedListSize = state.list.length;
    });

    builder.addCase(fetchCatalog.rejected, (state, action) => {
      alert('Не удалось загрузить каталог. Попробуйте позже...');
      alert(action.error.message);
    });
  },
});

export const selectSearchValue = (state: RootState) =>
  state.catalog.searchValue;

export const selectPageNumber = (state: RootState) => state.catalog.pageNumber;

export const {
  updateCategory,
  updateType,
  changeOrder,
  searchChanged,
  setPage,
  updateDisplayedListSize,
} = catalogSlice.actions;

export default catalogSlice.reducer;
