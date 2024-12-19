import { configureStore } from "@reduxjs/toolkit";
// Import reducer dari masing-masing slice
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

// Konfigurasi store dengan reducer
const store = configureStore({
    // Definisikan reducer untuk masing-masing state
    reducer: {
        products: productReducer, // Reducer untuk state produk
        cart: cartReducer, // Reducer untuk state keranjang
        user: userReducer, // Reducer untuk state user
    },
});

// Export store sebagai default
export default store;
