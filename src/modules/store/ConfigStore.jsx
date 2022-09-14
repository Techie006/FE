import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import auth from "../redux/auth";
import user from "../redux/userData";

const store = configureStore({
  reducer: { auth, user },
  // reducer: { user, post },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
