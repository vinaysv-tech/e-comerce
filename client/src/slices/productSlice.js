import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },
    fetchProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
    },
    fetchProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createProductSuccess: (state, action) => {
      state.products.unshift(action.payload);
    },
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    clearProductError: (state) => {
      state.error = null;
    }
  }
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFail,
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFail,
  createProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
  clearProductError
} = productSlice.actions;

export default productSlice.reducer;
