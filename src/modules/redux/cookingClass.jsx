import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  prevChats: [],
  sessionId: "",
  token: "",
  viewerNum: 0,
  isLoading: false,
  error: "",
  stompClient: {},
};

export const __getClassInfo = createAsyncThunk(
  "cookingClass/__getClassInfo",
  async ({ classId }, thunkAPI) => {
    try {
      const resp = await apis.get_class_info({ classId });
      const {
        content: { session_id, token, chats },
      } = resp.data;

      return thunkAPI.fulfillWithValue({ session_id, token, chats });
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

const cookingClassSlice = createSlice({
  name: "cookingClass",
  initialState,
  reducers: {
    enterClass: (state, action) => {
      const { message } = action.payload;
      state.prevChats = [...state.prevChats, message];
    },
    sendMessage: (state, action) => {
      const { message } = action.payload;
      state.prevChats = [...state.prevChats, message];
    },
    saveStompClient: (state, action) => {
      const { stompClient } = action.payload;
      state.stompClient = stompClient;
    },
  },
  extraReducers: {
    [__getClassInfo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getClassInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { session_id, token, chats } = action.payload;
      state.prevChats = chats;
      state.sessionId = session_id;
      state.token = token;
    },
    [__getClassInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { enterClass, sendMessage, saveStompClient } =
  cookingClassSlice.actions;
export default cookingClassSlice.reducer;
