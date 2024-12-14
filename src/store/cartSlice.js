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

    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload); // Hapus produk dari keranjang
    },

    updateQuantity: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity = action.payload.quantity; // Update quantity produk
      }
    },

    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },

    reduceStock: (state, action) => {
      const product = state.find(item => item.id === action.payload.id);
      if (product) {
        product.availableStock -= action.payload.quantity; // Kurangi stok produk
      }
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, setQuantity } = cartSlice.actions;
export default cartSlice.reducer;