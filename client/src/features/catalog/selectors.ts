import { RootState } from '../../app/store';

export const selectSearchValue = (state: RootState) =>
  state.catalog.searchValue;

export const selectPageNumber = (state: RootState) => state.catalog.pageNumber;
