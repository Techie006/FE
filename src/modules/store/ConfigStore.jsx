import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import auth from "../redux/auth";
import calendar from "../redux/calendar";
import user from "../redux/userData";

const store = configureStore({
  reducer: { auth, calendar, user },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
