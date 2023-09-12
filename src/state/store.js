import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";

// STORE CREATION

const store = configureStore({
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export default store;
