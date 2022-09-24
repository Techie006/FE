import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  prevChats: [],
  sessionId: "",
  token: "",
  viewerNum: 0,
  isLoading: false,
  error: "",
};

export const __getPrevChats = createAsyncThunk(
  "cookingClass/__getPrevChats",
  async ({ class_id }, thunkAPI) => {
    try {
      const resp = apis.get_class_info({ class_id });
      const {
        content: { session_id, token, chats },
      } = resp.data;
      return thunkAPI.fulfillWithValue({ session_id, token, chats });
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
      const { session_id, token, chats } = action.payload;
      state.prevChats = chats;
      state.sessionId = session_id;
      state.token = token;
    },
    [__getPrevChats.pending]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { enterClass, sendMessage } = cookingClassSlice.actions;
export default cookingClassSlice.reducer;
