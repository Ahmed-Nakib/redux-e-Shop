import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: {} }, // object keyed by product id
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const id = product.id;
      if (state.items[id]) {
        state.items[id].qty += 1;
      } else {
        state.items[id] = {
          ...product,
          qty: 1
        };
      }
    },
    removeToCart: (state, action) => {
      delete state.items[action.payload];
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      if (state.items[id]) state.items[id].qty += 1;
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id].qty -= 1;
        if (state.items[id].qty <= 0) delete state.items[id];
      }
    },
    clearCart: (state) => { state.items = {}; },
  }
});

export const { addToCart, removeToCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// ✅ Selector for total cart items
export const selectCartTotalItems = (state) =>
  Object.values(state.cart.items).reduce((sum, item) => sum + item.qty, 0);
