import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: localStorage.getItem("AccessToken") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
    },
    logout: (state, action) => {
      state.isLogin = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
