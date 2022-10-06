import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search : "",
  recommend : []
};

const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    searchData: (state, action) => {
      state.search = { ...action }
      
      console.log("action",action)
    },
    recommend : (state, action) => {
        state.recommend = { ...action }
    },
    deleteIngredient : (state, action) => {
        state.recommend = state.recommend.filter(
        (data) => data.id !== action.payload.id
      );
    }
    }
});

export const { searchData, recommend } = searchDataSlice.actions;
export default searchDataSlice.reducer;
