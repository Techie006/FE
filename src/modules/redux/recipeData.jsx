import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    ingredients : [],
    id : 1
};

var auth = localStorage.getItem("Authorization")
var refresh = localStorage.getItem("Refresh_Token");

export const __getAllIngredient = createAsyncThunk(
  "home/__getAllIngredient",
  
  async (curr, thunkAPI) => {
    try {
      const resp = await axios.get(`https://magorosc.shop/api/ingredients?storage=${curr}`,{
        headers : {
            "Authorization" : auth,
            "Refresh_Token" : refresh
        }
    }
    )
    const allIngredient = resp.data.content.storage
      return thunkAPI.fulfillWithValue(allIngredient);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __deleteIngredient = createAsyncThunk(
  "home/__deleteIngredient",
  async ( id , thunkAPI) => {
    try {
      const resp = await  axios.delete(`https://magorosc.shop/api/ingredient?id=${id}`,{
        headers : {
            "Authorization" : auth,
        }
    })    
      const restIngredinet = resp.data.content.storage
      return thunkAPI.fulfillWithValue(id);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipeData",
  initialState,
  reducers: {},
  extraReducers: {
    [__getAllIngredient.fulfilled]: (state, action) => {
  
      state.ingredients = action.payload;
    },
    [__deleteIngredient.fulfilled]: (state, action) => {

      state.ingredients = state.ingredients.filter(
        (data) => data.id !== action.payload.id
      );
  }  
}});

export const { recipeData } = recipeSlice.actions;
export default recipeSlice.reducer;
