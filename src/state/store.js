import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import counterReducer from "./counterReducer";

// STORE CREATION

const store = configureStore({
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    counter: counterReducer,
  },
});

export default store;
