import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: localStorage.getItem("Authorization") ? true : false,
  userInfo: {
    userId: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
    profileImg: localStorage.getItem("profileImg"),
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, { payload: userInfo }) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    signout: (state, _) => {
      state.isLogin = false;
    },
  },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
