import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  prevChats: [],
  viewerNum: 0,
  isLoading: false,
  error: "",
};

export const __getPrevChats = createAsyncThunk(
  "cookingClass/__getPrevChats",
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
  },
  extraReducers: {
    //getPrevChats
    [__getPrevChats.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getPrevChats.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.prevChats = action.payload;
    },
    [__getPrevChats.pending]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { enterClass, sendMessage } = cookingClassSlice.actions;
export default cookingClassSlice.reducer;
