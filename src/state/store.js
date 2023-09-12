import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";

// STORE CREATION

const store = configureStore({
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
