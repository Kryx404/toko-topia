import { createSlice } from '@reduxjs/toolkit';

// Membuat slice untuk produk dengan nama 'products'
const productSlice = createSlice({
  // Nama slice
  name: 'products',
  // State awal slice
  initialState: [],
  // Reducer untuk mengatur state
  reducers: {
    // Fungsi untuk mengatur produk
    setProducts: (state, action) => {
      // Mengembalikan payload dari action
      return action.payload;
    },
  },
});

// Mengekspor action 'setProducts'
export const { setProducts } = productSlice.actions;
// Mengekspor reducer default
export default productSlice.reducer;