import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import auth from "../redux/auth";
import calendar from "../redux/calendar";
import cookingClass from "../redux/cookingClass";
import user from "../redux/userData";
import searchData from "../redux/searchData";
import recipeData from "../redux/recipeData";

const store = configureStore({
  reducer: { auth, calendar, cookingClass, searchData, recipeData, user },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
