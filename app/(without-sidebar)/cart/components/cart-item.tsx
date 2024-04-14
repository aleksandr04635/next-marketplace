import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import { ProductCard } from "@/types";
import Currency from "@/components/currency";
import MyButton from "@/components/ui/my-button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  decreaseProductNumber,
  increaseProductNumber,
  removeProduct,
} from "@/redux/cart/cartSlice";
import { DEFAULT_IMAGES } from "@/lib/utils";
import Link from "next/link";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface CartItemProps {
  product: ProductCard;
  number: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, number }) => {
  const dispatch = useAppDispatch();
  //console.log("  product, number  from CartItem: ", product, number);

  return (
    <div className="flex  flex-row py-3 border-b justify-center items-center">
      <div className="relative h-16 w-16 rounded-md overflow-hidden sm:h-32 sm:w-32">
        <Image
          fill
          src={product.data.images[0]?.url || DEFAULT_IMAGES[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-3">
        {/* <div className="absolute z-10 right-0 top-0">
            <IconButton onClick={onRemove} icon={<X size={15} />} /> 
        </div> */}
        <div className="relative pr-2 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:pr-0">
          <div className=" text-lg font-semibold col-span-2 flex flex-row items-center">
            <Link
              href={`/product/${product.data?.id}`}
              className="link-stand cursor-pointer"
            >
              <p className="font-semibold text-base text-justify ">
                {product.data.name}
              </p>
            </Link>
          </div>
          <div className=" flex items-center justify-center">
            <Currency value={+product.data.price} />
          </div>
          <div className="flex  flex-row  justify-center items-center gap-2">
            <div className="text-xl font-semibold">{number}</div>
            {/*   <div className="flex flex-col   text-sm">
              <button
                className=" relative h-[16px] w-[19px] items-center overflow-hidden rounded-t-lg  border border-main-border text-center text-lg outline-1 outline-main-border hover:bg-active-bg hover:outline dark:hover:bg-dark-active-bg"
                type="button"
                onClick={() => {
                  dispatch(increaseProductNumber(product.data.id));
                }}
              >
                <p className="absolute right-[3px] top-[-1px] align-middle leading-3">
                  +
                </p>
              </button>
              <button
                className="relative h-[16px] w-[19px] items-center overflow-hidden rounded-b-lg border  border-main-border text-center text-2xl outline-1 outline-main-border hover:bg-active-bg hover:outline dark:hover:bg-dark-active-bg"
                type="button"
                onClick={() => {
                  if (number > 1) {
                    dispatch(decreaseProductNumber(product.data.id));
                  }
                }}
              >
                <p className="absolute right-[4px] top-[-12px] h-[3px] align-middle">
                  -
                </p>
              </button>
            </div> */}
            {/*  h-[40px] w-[20px]  */}
            <div
              className="   flex gap-1 flex-col h-fit w-fit items-center   justify-center rounded-full
  bg-gradient-to-bl from-cyan-400 via-blue-500 to-purple-600 p-[2px]
    dark:hover:bg-dark-active-bg   "
            >
              <div
                className=" p-1 cursor-pointer mx-auto flex h-full w-full items-center justify-center rounded-t-full
   bg-white text-slate-900 hover:bg-transparent hover:text-white dark:bg-dark-additional-bg
   dark:text-white dark:hover:bg-transparent "
                onClick={() => {
                  dispatch(increaseProductNumber(product.data.id));
                }}
              >
                <FaPlus className="h-3 w-3" />
              </div>
              <div
                className="p-1 cursor-pointer mx-auto flex h-full w-full items-center justify-center rounded-b-full
   bg-white text-slate-900 hover:bg-transparent hover:text-white dark:bg-dark-additional-bg
   dark:text-white dark:hover:bg-transparent "
                onClick={() => {
                  if (number > 1) {
                    dispatch(decreaseProductNumber(product.data.id));
                  }
                }}
              >
                <FaMinus className="h-3 w-3" />
              </div>
            </div>
            {/*     <button
      className="   flex h-[40px] w-[40px]   items-center   justify-center rounded-full
  bg-gradient-to-bl from-cyan-400 via-blue-500 to-purple-600 p-[2px]
    text-center  dark:hover:bg-dark-active-bg  sm:inline  "
      onClick={() =>
               {
          console.log("resolvedTheme from onClick: ", resolvedTheme);
          setTheme(resolvedTheme === "light" ? "dark" : "light");
        }
      }
    >
      <div
        className="mx-auto flex h-full w-full items-center justify-center rounded-full
   bg-white text-slate-900 hover:bg-transparent hover:text-white dark:bg-dark-additional-bg
   dark:text-white dark:hover:bg-transparent "
      >
        {resolvedTheme === "light" ? (
          <FaMoon className="mx-auto " />
        ) : (
          <FaSun className="mx-auto" />
        )}
      </div>
    </button> */}
            <MyButton
              variant="icon"
              type="button"
              className=" "
              onClick={() => dispatch(removeProduct(product.data.id))}
            >
              <X className="h-4 w-4" />
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
