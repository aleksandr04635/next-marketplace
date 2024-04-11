import { createSlice, current } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";

interface sliceState {
  cart: { id: string; number: number }[];
}

// Define the initial state using that type
const initialState: sliceState = {
  cart: [],
};

/* const initialState = {
  cart: [],
}; */

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<string>) => {
      let ind2 = -1;
      current(state.cart).forEach((prod, i) => {
        if (prod.id == action.payload) {
          ind2 = i;
        }
      });
      //console.log("ind2 from addProduct: ", ind2);
      if (ind2 != -1) {
        state.cart[ind2].number++;
      } else {
        state.cart.push({ id: action.payload, number: 1 });
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addProduct, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
