import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: localStorage.getItem("Authorization") ? true : false,
  userInfo: {
    member_id: 1,
    username: "",
    profile_img: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, _) => {
      state.isLogin = true;
    },
    saveInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    logout: (state, _) => {
      state.isLogin = false;
    },
  },
});

export const { login, saveInfo, logout } = authSlice.actions;
export default authSlice.reducer;
