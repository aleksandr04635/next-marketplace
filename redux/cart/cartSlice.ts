import { createSlice, current } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductCard } from "@/types";

/* interface cartItem extends ProductCard {
  number: number;
} */
type enteredData = ProductCard;
/* type enteredData = ProductCard & {
  number: number;
  id: string;
}; */
type cartItem = enteredData & {
  number: number;
};
/* interface Bear extends Animal {
  honey: boolean;
} */

interface sliceState {
  cart: cartItem[];
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
    addProduct: (state, action: PayloadAction<enteredData>) => {
      //console.log("action.payload from addProduct: ", action.payload);
      let ind2 = -1;
      current(state.cart).forEach((prod, i) => {
        if (prod.data.id == action.payload.data.id) {
          ind2 = i;
        }
      });
      //console.log("ind2 from addProduct: ", ind2);
      if (ind2 != -1) {
        state.cart[ind2].number++;
      } else {
        state.cart.push({ ...action.payload, number: 1 });
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      let ind2 = -1;
      current(state.cart).forEach((prod, i) => {
        if (prod.data.id == action.payload) {
          ind2 = i;
        }
      });
      if (ind2 != -1) {
        state.cart = current(state.cart).filter((it, ind) => ind != ind2);
      }
    },
    increaseProductNumber: (state, action: PayloadAction<string>) => {
      let ind2 = -1;
      current(state.cart).forEach((prod, i) => {
        if (prod.data.id == action.payload) {
          ind2 = i;
        }
      });
      if (ind2 != -1) {
        state.cart[ind2].number++;
      }
    },
    decreaseProductNumber: (state, action: PayloadAction<string>) => {
      /*  console.log(
        "action.payload from decreaseProductNumber: ",
        action.payload
      ); */
      let ind2 = -1;
      current(state.cart).forEach((prod, i) => {
        if (prod.data.id == action.payload) {
          ind2 = i;
        }
      });
      /* console.log(
        "current(state.cart) from decreaseProductNumber: ",
        current(state.cart)
      );
      console.log("ind2 from decreaseProductNumber: ", ind2); */
      if (ind2 != -1) {
        let num = current(state.cart[ind2]).number;
        //console.log("num from decreaseProductNumber: ", num);
        state.cart[ind2].number--;
        if (num == 1) {
          state.cart = current(state.cart).filter((it, ind) => ind != ind2);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearCart,
  increaseProductNumber,
  decreaseProductNumber,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
