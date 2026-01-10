import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userFromStorage,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('userInfo');
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
  logout,
  clearError
} = authSlice.actions;

export default authSlice.reducer;
