import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = null;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = null;
    },
    fetchOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = null;
    },
    fetchOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderSuccess: (state, action) => {
      const index = state.orders.findIndex(o => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    clearOrderError: (state) => {
      state.error = null;
    }
  }
});

export const {
  createOrderStart,
  createOrderSuccess,
  createOrderFail,
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFail,
  fetchOrderStart,
  fetchOrderSuccess,
  fetchOrderFail,
  updateOrderSuccess,
  clearOrderError
} = orderSlice.actions;

export default orderSlice.reducer;
