import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../api';

export const fetchCatalog = createAsyncThunk('catalog/fetchCatalog', () => {
  return api.catalog.get();
});
