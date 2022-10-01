import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipeData: {
    id : 1,
    recipe_name : "",
    ingredients : [],
  },

};

const recipeSlice = createSlice({
  name: "recipeData",
  initialState,
  reducers: {
    recipeData : (state, action) => {
        state.recipeData = {...action}
      console.log("action",action)
      console.log("111",state.recipeData)
    },
  },
});

export const { recipeData } = recipeSlice.actions;
export default recipeSlice.reducer;
