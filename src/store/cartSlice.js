import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity; // Tambah quantity jika produk sudah ada
      } else {
        state.push({ ...action.payload }); // Tambah produk baru ke keranjang
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;