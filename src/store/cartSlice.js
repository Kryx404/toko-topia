import { createSlice } from "@reduxjs/toolkit";

// Buat slice untuk manajemen keranjang belanja
const cartSlice = createSlice({
    // Nama slice
    name: "cart",

    // State awal keranjang belanja (kosong)
    initialState: [],

    // Reducer untuk mengelola keranjang belanja
    reducers: {
        // Tambah produk ke keranjang belanja
        addToCart: (state, action) => {
            // Cari produk yang sudah ada di keranjang
            const existingProduct = state.find(
                (item) => item.id === action.payload.id,
            );

            // Jika produk sudah ada, tambah quantity
            if (existingProduct) {
                existingProduct.quantity += action.payload.quantity;
            }
            // Jika produk belum ada, tambah produk baru ke keranjang
            else {
                state.push({ ...action.payload });
            }
        },

        // Hapus produk dari keranjang belanja
        removeFromCart: (state, action) => {
            // Filter produk yang tidak ingin dihapus
            return state.filter((item) => item.id !== action.payload);
        },

        // Update quantity produk di keranjang belanja
        updateQuantity: (state, action) => {
            // Cari produk yang ingin diupdate
            const existingProduct = state.find(
                (item) => item.id === action.payload.id,
            );

            // Jika produk ditemukan, update quantity
            if (existingProduct) {
                existingProduct.quantity = action.payload.quantity;
            }
        },

        // Kosongkan keranjang belanja
        clearCart: (state) => {
            // Kembalikan state awal (kosong)
            return [];
        },

        // Set quantity produk di keranjang belanja
        setQuantity: (state, action) => {
            // Set quantity produk
            state.quantity = action.payload;
        },

        // Kurangi stok produk
        reduceStock: (state, action) => {
            // Cari produk yang ingin dikurangi stoknya
            const product = state.find((item) => item.id === action.payload.id);

            // Jika produk ditemukan, kurangi stok
            if (product) {
                product.availableStock -= action.payload.quantity;
            }
        },
    },
});

// Export action dan reducer
export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    setQuantity,
    clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
