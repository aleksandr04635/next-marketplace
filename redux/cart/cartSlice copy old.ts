/* import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
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

export default cartSlice.reducer;
 */
