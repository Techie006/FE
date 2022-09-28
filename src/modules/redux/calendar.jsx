import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apis } from "../../shared/axios";

const initialState = {
  dietModalOpen: false, // 식단 모달 여닫기
  modalType: "", // 식단 모달 타입이 create / update 인지 저장
  selectedDate: {}, // create 타입의 식단 모달을 열 때 캘린더에서 선택한 날짜를 저장
  selectedDiet: {}, // update 타입의 식단 모달을 열 때 주별 식단에서 선택한 식단을 저장

  searchModalOpen: false, // 검색 모달 여닫기
  selectedRecipe: {}, // 검색 모달에서 선택한 레시피 저장

  datePickerOpen: false, // 날짜 선택 필드 여닫기

  isLoading: false, // 캘린더 페이지에 맨 처음 들어왔을 때 전체 식단 정보를 성공적으로 불러왔는지 여부를 저장
  error: "", // 전역 에러를 저장
  allDiets: [], // 사용자의 전체 식단 정보 저장
  weeklyDiets: [], // 사용자의 이번주 식단 정보 저장
  week: [], // 이번주에 해당하는 날짜 저장
};

export const __getAllDiets = createAsyncThunk(
  "calendar/__getAllDiets",
  async (_, thunkAPI) => {
    try {
      const resp = await apis.get_all_diets();
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
    openDietModal: (state, action) => {
      state.dietModalOpen = true;
      state.modalType = action.payload.type;
      state.selectedDiet = action.payload.diet;
      state.selectedDate = action.payload.date;
    },
    closeDietModal: (state, _) => {
      state.dietModalOpen = false;
      state.modalType = "";
      state.selectedDiet = {};
      state.selectedDate = "";
      state.selectedRecipe = {};
      state.datePickerOpen = false;
    },
    openSearchModal: (state, _) => {
      state.datePickerOpen = false;
      state.searchModalOpen = true;
    },
    closeSearchModal: (state, action) => {
      state.searchModalOpen = false;
      state.selectedRecipe = action.payload;
    },
    openDatePicker: (state, _) => {
      state.datePickerOpen = true;
    },
    closeDatePicker: (state, action) => {
      state.selectedDate = action.payload.selectedDate;
      state.datePickerOpen = false;
    },
  },
  extraReducers: {
    // getAllDiets
    [__getAllDiets.pending]: (state, _) => {
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
    [__getWeeklyDiets.pending]: (state, _) => {
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
    [__createDiet.pending]: (state, _) => {
      state.isLoading = true;
    },
    [__createDiet.fulfilled]: (state, action) => {
      state.isLoading = false;
      // 신규 생성한 식단을 캘린더에 추가
      state.allDiets.push(action.payload.meals);

      // 신규 생성한 식단 요리 날짜가 이번주 내인 경우, weekDiets에 추가하고 정렬
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
    [__updateDiet.pending]: (state, _) => {
      state.isLoading = true;
    },
    [__updateDiet.fulfilled]: (state, action) => {
      state.isLoading = false;
      // 변경한 식단을 캘린더에 반영
      state.allDiets = state.allDiets.map((diet) => {
        if (diet.id === action.payload.id) {
          return action.payload.meals;
        }
        return diet;
      });

      // 변경한 식단 요리 날짜가 이번주 내인 경우, weekDiets를 변경
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
    [__deleteDiet.pending]: (state, _) => {
      state.isLoading = true;
    },
    [__deleteDiet.fulfilled]: (state, action) => {
      state.isLoading = false;
      // 삭제한 식단을 캘린더에 반영
      state.allDiets = state.allDiets.filter(
        (diet) => diet.id !== action.payload.id
      );

      // 삭제한 식단 요리 날짜가 이번주 내인 경우, weekDiets를 변경
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

export const {
  openDietModal,
  closeDietModal,
  openSearchModal,
  closeSearchModal,
  openDatePicker,
  closeDatePicker,
} = calendarSlice.actions;
export default calendarSlice.reducer;
