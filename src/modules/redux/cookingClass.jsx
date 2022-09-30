import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  modalOpen: false,
  selectedRecipe: {},
  prevChats: [],
  sessionId: "",
  token: "",
  viewerNum: 0,
  isLoading: false,
  error: "",
};

// export const __getClassInfo = createAsyncThunk(
//   "cookingClass/__getClassInfo",
//   async ({ classId }, thunkAPI) => {
//     try {
//       const resp = await apis.get_class_info({ classId });
//       const {
//         content: { session_id, token, chats },
//       } = resp.data;

//       return thunkAPI.fulfillWithValue({ session_id, token, chats });
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.code);
//     }
//   }
// );

const cookingClassSlice = createSlice({
  name: "cookingClass",
  initialState,
  reducers: {
    openModal: (state, _) => {
      state.modalOpen = true;
    },
    closeModal: (state, action) => {
      state.modalOpen = false;
      const { recipe } = action.payload;
      state.selectedRecipe = recipe;
    },
    createdClass: (state, action) => {
      const { session_id, token } = action.payload;
      state.sessionId = session_id;
      state.token = token;
    },
    enterClass: (state, action) => {
      const { session_id, token, chats } = action.payload;
      state.sessionId = session_id;
      state.token = token;
      state.prevChats = chats;
    },
    sendMessage: (state, action) => {
      const { message } = action.payload;
      state.prevChats = [...state.prevChats, message];
    },
    enterEvent: (state, action) => {
      const { chat } = action.payload;
      state.viewerNum = chat.viewer_num;
      state.prevChats = [...state.prevChats, chat];
    },
    messageEvent: (state, action) => {
      const { chat } = action.payload;
      state.prevChats = [...state.prevChats, chat];
    },
    leaveEvent: (state, action) => {
      const { chat } = action.payload;
      state.viewerNum = chat.viewer_num;
      state.prevChats = [...state.prevChats, chat];
    },
  },
  extraReducers: {
    // [__getClassInfo.pending]: (state, _) => {
    //   state.isLoading = true;
    // },
    // [__getClassInfo.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   const { session_id, token, chats } = action.payload;
    //   state.prevChats = chats;
    //   state.sessionId = session_id;
    //   state.token = token;
    // },
    // [__getClassInfo.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const {
  openModal,
  closeModal,
  enterClass,
  createdClass,
  sendMessage,
  enterEvent,
  messageEvent,
  leaveEvent,
} = cookingClassSlice.actions;
export default cookingClassSlice.reducer;
