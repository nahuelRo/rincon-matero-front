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
    setUser: (state, action) => {
      const { address, email, id, last_name, name, role } = action.payload;

      (state.address = address),
        (state.email = email),
        (state.id = id),
        (state.last_name = last_name);
      state.name = name;
      state.role = role;
    },
  },
});

export const { setUser } = userReducer.actions;
export default userReducer.reducer;
