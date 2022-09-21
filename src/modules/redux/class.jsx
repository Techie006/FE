import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  chats: [],
  viewerNum: 0,
  isLoading: false,
  error: "",
};

export const __getPrevChats = createAsyncThunk(
  "class/__getPrevChats",
  async ({ class_id }, thunkAPI) => {
    try {
      const resp = apis.get_prev_chats({ class_id });
      const {
        content: { chats },
      } = resp.data;
      return thunkAPI.fulfillWithValue(chats);
    } catch (e) {
      return thunkAPI.fulfillWithValue(e.code);
    }
  }
);

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    enterClass: (state, action) => {
      const { message } = action.payload;
      state.chats = [...state.chats, message];
    },
    sendMessage: (state, action) => {
      const { message } = action.payload;
      state.chats = [...state.chats, message];
    },
  },
  extraReducers: {
    //getPrevChats
    [__getPrevChats.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPrevChats.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.chats = action.payload;
    },
    [__getPrevChats.pending]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { enterClass, sendMessage } = classSlice.actions;
export default classSlice.reducer;
