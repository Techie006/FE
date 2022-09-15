import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  updateOpen: false,
  recipeOpen: false,
  isLoading: false,
  error: "",
  allDiets: [],
  weeklyDiets: [],
  week: [],
};

export const __getAllDiets = createAsyncThunk(
  "calendar/__getAllDiets",
  async ({ date }, thunkAPI) => {
    try {
      const resp = await apis.get_all_diets({ date });
      const {
        content: { meals },
      } = resp.data;

      return thunkAPI.fulfillWithValue(meals);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __getWeeklyDiets = createAsyncThunk(
  "calendar/__getWeeklyDiets",
  async ({ date }, thunkAPI) => {
    try {
      const resp = await apis.get_weekly_diets({ date });
      const {
        content: { days, recipes },
      } = resp.data;
      return thunkAPI.fulfillWithValue({ days, recipes });
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __createDiet = createAsyncThunk(
  "calendar/__createDiet",
  async ({ recipe_name, category, date }, thunkAPI) => {
    try {
      const resp = await apis.create_diet({ recipe_name, category, date });
      const {
        content: { day, meal },
      } = resp.data;
      return thunkAPI.fulfillWithValue({ day, meal });
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updateDiet = createAsyncThunk(
  "calendar/__updateDiet",
  async ({ id, recipe_name, category, date }, thunkAPI) => {
    try {
      const resp = await apis.update_diet({ id, recipe_name, category, date });
      const {
        content: { day, meal },
      } = resp.data;
      return thunkAPI.fulfillWithValue({ id, day, meal });
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __deleteDiet = createAsyncThunk(
  "calendar/__deleteDiet",
  async ({ id }, thunkAPI) => {
    try {
      const resp = await apis.delete_diet({ id });
      const {
        content: { day, meal },
      } = resp.data;
      return thunkAPI.fulfillWithValue({ id, day, meal });
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

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
  },
  extraReducers: {
    // getAllDiets
    [__getAllDiets.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getAllDiets.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allDiets = action.payload;
    },
    [__getAllDiets.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // getWeeklyDiets
    [__getWeeklyDiets.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getWeeklyDiets.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.weeklyDiets = action.payload.recipes;
      state.week = action.payload.days;
    },
    [__getWeeklyDiets.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // create Diet
    [__createDiet.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__createDiet.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allDiets = state.allDiets.push(action.meal);
      if (state.week.find(action.payload.day)) {
        const unorderedDiets = state.weeklyDiets.push(action.payload.meal);
        const orderedDiets = unorderedDiets.sort(
          (a, b) => new Date(a.day) - new Date(b.day)
        );
        state.weeklyDiets = orderedDiets;
      }
    },
    [__createDiet.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // update Diet
    [__updateDiet.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__updateDiet.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allDiets = state.allDiets.map((diet) => {
        if (diet.id === action.payload.id) {
          return action.payload.meal;
        }
        return diet;
      });
      if (state.week.find(action.payload.day)) {
        state.weeklyDiets = state.weeklyDiets.map((diet) => {
          if (diet.id === action.payload.id) {
            return action.payload.meal;
          }
          return diet;
        });
      }
    },
    [__updateDiet.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // delete Diet
    [__deleteDiet.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteDiet.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allDiets = state.allDiets.filter(
        (diet) => diet.id !== action.payload.id
      );
      if (state.week.find(action.payload.day)) {
        state.weeklyDiets = state.weeklyDiets.filter(
          (diet) => diet.id !== action.payload.id
        );
      }
    },
    [__deleteDiet.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { openRecipeModal, openUpdateModal, closeModal } =
  calendarSlice.actions;
export default calendarSlice.reducer;
