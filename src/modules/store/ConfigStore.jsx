import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import auth from "../redux/auth";

import user from "../redux/userData";
import storage from "../redux/storage";
import searchData from "../redux/searchData";


const store = configureStore({
  reducer: { auth, user, storage, searchData},
  // reducer: { user, post },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
