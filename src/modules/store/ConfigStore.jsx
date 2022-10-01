import { configureStore } from "@reduxjs/toolkit";

import logger from "redux-logger";

import auth from "../redux/auth";
import calendar from "../redux/calendar";
import cookingClassuser from "../redux/cookingClass";
import user from "../redux/userData";
// import storage from "../redux/storage";
import searchData from "../redux/searchData";
import recipeData from "../redux/recipeData";

const store = configureStore({
  reducer: { auth, calendar, cookingClassuser, searchData, recipeData, user },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
