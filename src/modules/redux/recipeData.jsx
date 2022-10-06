// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';

// const initialState = {
//     recipeData: {
//     id : 1,
//   },
// };

// // export const __getAllIngredients = createAsyncThunk(
// //     "home/__getAllIngredient",
    
// //     async ({ id }, thunkAPI) => {
// //       try {
// //         const auth = localStorage.getItem("Authorization")
// //         const resp = await  axios.get(`https://magorosc.shop/api/ingredients?storage=""`,{
              
// //                   headers : {
// //                       "Authorization" : auth,
// //                   }
// //               }
// //               )
// //         const { content } = resp.data
// //         console.log(resp.data)
// //         return thunkAPI.fulfillWithValue({ id, content });
  
// //       } catch (e) {
// //         return thunkAPI.rejectWithValue(e.code);
// //       }
// //     }
// //   );

// // export const __deleteIngredient = createAsyncThunk(
// //   "home/__deleteIngredient",
  
// //   async ({ id }, thunkAPI) => {
// //     try {
// //       const auth = localStorage.getItem("Authorization")
// //       const resp = await  axios.delete(`https://magorosc.shop/api/ingredient?id=${id}`,{
            
// //                 headers : {
// //                     "Authorization" : auth,
// //                 }
// //             }
// //             )
// //       const { content } = resp.data
// //       console.log(resp.data)
// //       return thunkAPI.fulfillWithValue({ id, content });

// //     } catch (e) {
// //       return thunkAPI.rejectWithValue(e.code);
// //     }
// //   }
// // );

// const recipeSlice = createSlice({
//   name: "recipeData",
//   initialState,
//   reducers: {
//     recipeData : (state, action) => {
//         state.recipeData = {...action}
//     },
//   },
// //   extraReducers: {
// //     [__deleteIngredient.fulfilled]: (state, action) => {

// //       state.allIngredients = state.allIngredients.filter(
// //         (data) => data.id !== action.payload.id
// //       );
// //   }
// // }
// });

// export const { recipeData } = recipeSlice.actions;
// export default recipeSlice.reducer;
