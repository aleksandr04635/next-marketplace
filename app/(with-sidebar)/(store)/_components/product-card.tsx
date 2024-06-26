"use client";

import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Currency from "../../../../components/currency";
import Link from "next/link";
import { ProductCardEx } from "@/types";
import MyButton from "@/components/ui/my-button";
import { GrCart } from "react-icons/gr";
import { addProduct } from "@/redux/cart/cartSlice";
import { useAppDispatch } from "@/redux/store";
import { User } from "@prisma/client";

//import IconButton  from "@/components/ui/icon-button";
//import usePreviewModal from "@/hooks/use-preview-modal";
//import useCart from "@/hooks/use-cart";
//import { Product } from "@/types";

/* interface Props extends ProductCardType {
  user: User;
} */
//const ProductCard: React.FC<ProductCardType & { user: User }> = ({ data }) => {
//const ProductCard: React.FC<Props> = ({ data }) => {
const ProductCard: React.FC<ProductCardEx> = ({ data }) => {
  //console.log("data from ProductCard: ", data);
  //const previewModal = usePreviewModal();
  //const cart = useCart();
  const router = useRouter();
  const dispatch = useAppDispatch();

  /*   const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    // previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    // cart.addItem(data);
  }; */

  // group cursor-pointer overflow-hidden relative  h-full h-[170px]
  return (
    <div
      className="bg-white dark:bg-dark-additional-bg/40 overflow-hidden  rounded-lg
     border border-main-border dark:border-main-border h-full "
    >
      <div className=" w-full aspect-square bg-white">
        {/*  relative */}
        <Link
          href={`/product/${data?.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={
              data.images?.[0]?.url ||
              "https://res.cloudinary.com/dqwdfhxgl/image/upload/v1712544917/contacts/hlpiz8yi2vi8ksfleelk.jpg"
            }
            alt=""
            width={300}
            height={300}
            /* fill */
            className=" object-contain h-full border-0" /* aspect-square */
          />
        </Link>
        {/*<div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
           <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={onPreview} 
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart} 
              icon={<ShoppingCart size={20} className="text-gray-600" />} 
            />
          </div> 
        </div>*/}
      </div>
      <div className="flex flex-col justify-between h-[310px]  p-2 space-y-0">
        {/*  h-[250px] */}
        <MyButton
          variant="icon"
          className=" "
          onClick={() => dispatch(addProduct({ data: data }))}
        >
          <GrCart className="mr-2 h-5 w-5" />
          Add To Cart
        </MyButton>
        <div className="flex text-base  items-center justify-between">
          <Currency value={+data?.price} />
        </div>
        <Link
          href={`/product/${data?.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-stand cursor-pointer"
        >
          <p className="font-semibold text-sm text-justify">{data.name}</p>
        </Link>
        <p className=" text-sm text-justify">
          store: {data.user.storeName || data.user.email}
        </p>
        {/*     <p className="text-sm text-gray-500">{data.category?.name}</p> */}
        <div className="space-y-0">
          {data.productProperties.map((pr, j) => (
            <div
              key={j}
              className="mr-4 flex  sm:flex-row w-full  sm:items-center justify-start space-x-2 rounded-lg
                  px-2 py-0  dark:bg-inherit dark:text-white text-sm "
            >
              {/* bg-active-bg   dark:bg-dark-active-bg   dark:bg-dark-additional-bg/70 */}
              <div>
                {pr.propertyName}
                {": "}
              </div>
              <div>{pr.valueName}</div>
            </div>
          ))}
        </div>
        {/* Price & Reiew */}
      </div>
    </div>
  );
};

export default ProductCard;
