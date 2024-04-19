"use client";
import { ShoppingCart } from "lucide-react";
import Currency from "@/components/currency";
import Gallery from "@/components/gallery";
import { TiShoppingCart } from "react-icons/ti";
import { GrCart } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

import { db } from "@/lib/db";
import { ProductCard } from "@/types";
import MyButton from "@/components/ui/my-button";
import { addProduct } from "@/redux/cart/cartSlice";
import { useAppDispatch } from "@/redux/store";

export const revalidate = 0;

/* interface ProductPageProps {
  params: {
    productId: string;
  };
} */

//const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
const ProductComponent: React.FC<ProductCard> = ({ data }) => {
  //console.log("data from ProductComponent: ", data);
  const dispatch = useAppDispatch();

  if (!data) {
    return null;
  }

  //h-full
  return (
    <div className="bg-white dark:bg-dark-additional-bg/40 w-full h-fit m-2 rounded-lg border border-main-border">
      {/*  <div className="mx-auto max-w-5xl"> */}
      <div className="px-3 py-3 ">
        <div className="md:grid md:grid-cols-2 md:items-start md:gap-x-3">
          <Gallery images={data.images} />
          <div className="flex flex-col gap-3 mt-2 p-0 md:mt-0 md:px-0 text-gray-900 dark:text-white ">
            <MyButton
              className=" "
              onClick={() => dispatch(addProduct({ data: data }))}
            >
              <GrCart className="mr-2 h-5 w-5" />
              Add To Cart
            </MyButton>
            <div className="text-xl ">
              <Currency value={+data?.price} />
            </div>
            <h1 className="text-2xl font-bold text-justify">{data.name}</h1>
            {/* <div className="mt-3 flex items-end justify-between"></div> */}
            <div className="space-y-0">
              {data.productProperties.map((pr, j) => (
                <div
                  key={j}
                  className="mr-4 flex flex-col sm:flex-row w-full  sm:items-center justify-start space-x-2 
                      rounded-lg bg-active-bg   px-2 py-0 dark:bg-dark-active-bg dark:text-white "
                >
                  <div>
                    {pr.propertyName}
                    {": "}
                  </div>
                  <div>{pr.valueName}</div>
                </div>
              ))}

              {/*  <hr className="my-4" /> */}
              {/*<div className="flex flex-col gap-y-6">
                     <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div>{data?.size?.value}</div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div
                      className="h-6 w-6 rounded-full border border-gray-600"
                      style={{ backgroundColor: data?.color?.value }}
                    />
                  </div> 
                </div>*/}
              {/*  <div className="mt-10 flex items-center gap-x-3">                  
                     <Button
                    onClick={onAddToCart}
                    className="flex items-center gap-x-2"
                  >
                    Add To Cart
                    <ShoppingCart size={20} />
                  </Button> 
                </div> */}
            </div>

            {/* <div className="text-justify">{data.description}</div> */}
            <div className="text-justify">
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></div>
            </div>
          </div>
        </div>
        {/*  <hr className="my-10" /> */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default ProductComponent;
