import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import auth from "../redux/auth";

const store = configureStore({
  reducer: { auth },
  // reducer: { user, post },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
