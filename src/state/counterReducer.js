import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

export const counterReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCounter: (state) => {
      return state + 1;
    },
  },
});

export const { setCounter } = counterReducer.actions;
export default counterReducer.reducer;
