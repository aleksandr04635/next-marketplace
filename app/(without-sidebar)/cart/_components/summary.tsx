"use client";

//import axios from "axios";
import { useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import { toast } from "react-hot-toast";
import Currency from "@/components/currency";
import MyButton from "@/components/ui/my-button";
import { clearCart, selectCart } from "@/redux/cart/cartSlice";
import { checkout } from "@/actions/checkout/checkout";
import { useCurrentUser } from "@/hooks/use-current-user";

const Summary = () => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(selectCart);
  const user = useCurrentUser();
  const router = useRouter();
  // console.log("  cart  from CartPage: ", cart);
  let totalPrice = 0;
  if (cart) {
    for (let item of cart) {
      totalPrice += item.number * +item.data.price;
    }
  }

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      dispatch(clearCart());
      router.push("/admin/orders-from-me");
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams]);

  /*   const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0); */

  const onCheckout = async () => {
    if (user) {
      startTransition(() => {
        checkout(cart)
          .then((data) => {
            console.log("data:", data);
            if (data?.error) {
              toast.error(data.error);
            }
            if (data?.success) {
              // @ts-ignore
              window.location = data.success;
            }
          })
          .catch(() => toast("Something went wrong"));
      });
    } else {
      router.push("/auth/login?callbackUrl=%2Fcart");
    }
    /*  const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );
    window.location = response.data.url; */
  };

  return (
    <div className=" rounded-lg px-4 pt-2 sm:p-4 md:col-span-5  md:p-4 pb-2 md:pb-2">
      {/*  <h2 className="text-lg font-medium ">Order summary</h2> */}
      <div className="mt-0 space-y-2">
        <div className="flex items-center justify-between  border-gray-200 pt-0 text-xl">
          <div className="text-base font-medium ">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <div className="mt-3 space-y-2 text-sm text-orange-500">
        For testing upon clicking &ldquo;Checkout&ldquo; enter credit card
        number 4242 4242 4242 4242, any CVC and any expiration date in the
        future
      </div>
      <MyButton
        onClick={onCheckout}
        disabled={cart.length === 0 || isPending}
        className="sm:!w-[300px] mx-auto mt-4"
      >
        {user ? "Checkout" : "Sign in to buy"}
      </MyButton>
    </div>
  );
};

export default Summary;
