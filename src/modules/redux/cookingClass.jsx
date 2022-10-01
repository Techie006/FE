import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  selectedRecipe: {},
  prevChats: [],
  sessionId: "",
  token: "",
  fullToken: "",
  viewerNum: 0,
  isLoading: false,
  error: "",
};

const cookingClassSlice = createSlice({
  name: "cookingClass",
  initialState,
  reducers: {
    resetSelected: (state, _) => {
      state.selectedRecipe = {};
    },
    openModal: (state, _) => {
      state.modalOpen = true;
    },
    closeModal: (state, action) => {
      state.modalOpen = false;
      const { recipe } = action.payload;
      state.selectedRecipe = recipe;
    },
    createdClass: (state, action) => {
      const { session_id, token, full_token } = action.payload;
      state.sessionId = session_id;
      state.fullToken = full_token;
      state.token = token;
    },
    enterClass: (state, action) => {
      const { session_id, token, full_token, chats } = action.payload;
      state.sessionId = session_id;
      state.token = token;
      state.fullToken = full_token;
      state.prevChats = chats;
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
});

export const {
  resetSelected,
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
