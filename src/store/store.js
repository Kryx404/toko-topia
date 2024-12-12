import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart : cartReducer,
    user: userReducer,
  },
});

export default store;