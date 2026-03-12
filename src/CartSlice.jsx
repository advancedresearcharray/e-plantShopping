import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const incomingItem = action.payload;
      const existingItem = state.items.find((item) => item.name === incomingItem.name);

      if (existingItem) {
        existingItem.quantity += 1;
        return;
      }

      state.items.push({
        ...incomingItem,
        quantity: 1,
      });
    },
    removeItem: (state, action) => {
      const itemName = action.payload;
      state.items = state.items.filter((item) => item.name !== itemName);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.name === name);

      if (!item) {
        return;
      }

      if (quantity <= 0) {
        state.items = state.items.filter((cartItem) => cartItem.name !== name);
        return;
      }

      item.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
