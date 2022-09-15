import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updateOpen: false,
  recipeOpen: false,
  allRecipes: [],
  weekRecipes: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    openRecipeModal: (state, action) => {
      state.updateOpen = false;
      state.recipeOpen = !state.recipeOpen;
    },
    openUpdateModal: (state, action) => {
      state.recipeOpen = false;
      state.updateOpen = !state.updateOpen;
    },
    closeModal: (state, action) => {
      state.updateOpen = false;
      state.recipeOpen = false;
    },
    getDiets: (state, action) => {},
    createDiet: (state, action) => {},
    updateDiet: (state, action) => {},
    deleteDiet: (state, action) => {},
  },
});

export const { openRecipeModal, openUpdateModal, closeModal } =
  calendarSlice.actions;
export default calendarSlice.reducer;
