import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
  loading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.id === item.id);

      if (existItem) {
        state.cartItems = state.cartItems.map(x =>
          x.id === existItem.id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(x => x.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateCartItem: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(x => x.id === id);
      
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
