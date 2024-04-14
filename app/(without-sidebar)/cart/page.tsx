"use client";

import { useEffect, useState } from "react";
//import { Metadata } from "next";
import { clearCart, selectCart } from "@/redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import Summary from "./components/summary";
import CartItem from "./components/cart-item";
import MyButton from "@/components/ui/my-button";

export const revalidate = 0;

/* export const metadata: Metadata = {
  title: "Shopping cart | My Marketplace",
  description: "A marketplace created with Next.js 14 and Prisma",
}; */

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(selectCart);
  console.log("  cart  from CartPage: ", cart);
  let num = 0;
  if (cart) {
    for (let item of cart) {
      num += item.number;
    }
  }
  //console.log("   num  from CartPage: ", num);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  //h-full
  return (
    <div className=" w-full p-2 ">
      <div className="bg-white  dark:bg-dark-additional-bg/40 w-full  p-2 rounded-lg border border-main-border">
        <div className="px-4 pt-2 pb-0 sm:px-4 lg:px-4">
          <h1 className="text-xl font-semibold">Shopping Cart</h1>
          {/*        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12"> */}
          <div className="">
            {/* lg:col-span-7 */}
            {cart.length === 0 && <p className="">The cart is empty.</p>}
            {/*  <ul>
    {cart.map((item) => (
      <CartItem key={item.id} data={item} />
    ))}
  </ul> */}
            {cart &&
              cart.length > 0 &&
              cart.map((item) => (
                <CartItem
                  key={item.data.id}
                  product={{ data: item.data }}
                  number={item.number}
                />
              ))}
          </div>
          <Summary />
          {/*  </div> */}
        </div>
        {/*     <MyButton
          onClick={() => dispatch(clearCart())}
          disabled={cart.length === 0}
          className="w-full "
        >
          Clear
        </MyButton> */}
      </div>
    </div>
  );
};

export default CartPage;
