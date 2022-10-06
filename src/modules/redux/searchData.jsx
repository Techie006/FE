import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search : "",
  recommend : ""
};

const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    searchData: (state, action) => {
      state.search = { ...action }
    },
    recommend : (state, action) => {
        state.recommend = { ...action }
        
    },
    }
});

export const { searchData, recommend } = searchDataSlice.actions;
export default searchDataSlice.reducer;
