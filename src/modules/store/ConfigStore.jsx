import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import auth from "../redux/auth";
import user from "../redux/userData";
import storage from "../redux/storage";

const store = configureStore({
  reducer: { auth, user, storage },
  // reducer: { user, post },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
