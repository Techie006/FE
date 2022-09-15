import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import auth from "../redux/auth";
import calendar from "../redux/calendar";

const store = configureStore({
  reducer: { auth, calendar },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
