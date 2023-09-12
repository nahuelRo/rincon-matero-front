import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.some((item) => item.id === action.payload.id)) {
        return state;
      }

      localStorage.setItem("cart", JSON.stringify([...state, action.payload]));

      return [...state, action.payload];
    },

    removeFromCart: (state, action) => {
      state = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state));

      return state;
    },
  },
});

export const { addToCart, removeFromCart } = cartReducer.actions;
export default cartReducer.reducer;
