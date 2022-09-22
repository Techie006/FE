import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import auth from "../redux/auth";
import calendar from "../redux/calendar";
import cookingClass from "../redux/cookingClass";

const store = configureStore({
  reducer: { auth, calendar, cookingClass },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
