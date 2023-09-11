import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
  email: null,
  id: 0,
  last_name: null,
  name: null,
  role: null,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => (state = action.payload),
  },
});

export const { setUser } = userReducer.actions;
export default userReducer.reducer;
