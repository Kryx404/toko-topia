import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false, // Status login awal
    userInfo: null, // Informasi pengguna (jika diperlukan)
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload; // Simpan informasi pengguna
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null; // Hapus informasi pengguna saat logout
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;