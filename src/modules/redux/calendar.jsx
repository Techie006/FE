import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  modalOpen: false,
  modalType: "",
  selectedDiet: {},
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
        content: { days, meals },
      } = resp.data;
      return thunkAPI.fulfillWithValue({ days, meals });
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
        content: { meals },
      } = resp.data;
      // TODO API 수정
      return thunkAPI.fulfillWithValue({ day: date, meals });
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
        content: { day, meals },
      } = resp.data;
      return thunkAPI.fulfillWithValue({ id, day, meals });
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
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalType = action.payload.type;
      state.selectedDiet = action.payload.diet;
    },
    closeModal: (state, action) => {
      state.modalOpen = false;
      state.modalType = "";
      state.selectedDiet = {};
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
      state.weeklyDiets = action.payload.meals;
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
      state.allDiets.push(action.payload.meals);

      if (state.week.indexOf(action.payload.day)) {
        state.weeklyDiets.push(action.payload.meals);
        const orderedDiets = state.weeklyDiets.sort(
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
          return action.payload.meals;
        }
        return diet;
      });
      if (state.week.indexOf(action.payload.day)) {
        state.weeklyDiets = state.weeklyDiets.map((diet) => {
          if (diet.id === action.payload.id) {
            return action.payload.meals;
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
      if (state.week.indexOf(action.payload.day)) {
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

export const { openModal, closeModal } = calendarSlice.actions;
export default calendarSlice.reducer;
