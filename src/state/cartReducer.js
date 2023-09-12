import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item } = action.payload;

      state.totalPrice += item.price * item.amount;
      state.items = [...state.items, item];

      return state;
    },

    removeFromCart: (state, action) => {
      const { index } = action.payload;

      const removedItem = state.items[index];

      state.items = items.filter((_, i) => i !== index);

      state.totalPrice =
        state.totalPrice - removedItem.price * removedItem.amount;

      return state;
    },
  },
});

export const { setCart } = cartReducer.actions;
export default cartReducer.reducer;
