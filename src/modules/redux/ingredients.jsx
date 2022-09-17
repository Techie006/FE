import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredientData : {
        food_name : "",
        in_date : "",
        d_date : "",
        group_name : ""
    }
  };


const ingredientsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    ingredientData: (state, action) => {
      state.ingredientData = {...action.payload}
      console.log("action",action.payload)
    },

  },
});

export const { ingredientData } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
