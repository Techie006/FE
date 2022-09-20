import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  viewerNum: 0,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    enterClass: (state, action) => {
      const { message } = action.payload;
      state.chats = [...state.chats, message];
    },
    sendMessage: () => {},
    leaveClass: () => {},
  },
});
