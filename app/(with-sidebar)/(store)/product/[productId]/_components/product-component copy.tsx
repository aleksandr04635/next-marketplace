"use client";
import { ShoppingCart } from "lucide-react";
import Currency from "@/components/currency";
import Gallery from "@/components/gallery";
import { TiShoppingCart } from "react-icons/ti";
import { GrCart } from "react-icons/gr";

import { db } from "@/lib/db";
import { ProductCard } from "@/types";
import MyButton from "@/components/ui/my-button";

export const revalidate = 0;

/* interface ProductPageProps {
  params: {
    productId: string;
  };
} */

//const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
const ProductComponent: React.FC<ProductCard> = ({ data }) => {
  console.log("data from ProductComponent: ", data);

  if (!data) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-dark-additional-bg/40 w-full h-full m-2 rounded-lg border border-main-border">
      <div className="mx-auto max-w-5xl">
        <div className="px-4 py-4 sm:px-4 lg:px-4">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-6">
            <Gallery images={data.images} />
            <div className="flex flex-col mt-4 px-4 sm:mt-6 sm:px-0 lg:mt-0 text-gray-900 dark:text-white gap-2">
              <div>
                <MyButton className=" ">
                  <GrCart className="mr-2 h-5 w-5" />
                  Add To Cart
                </MyButton>
                <div className="text-xl ">
                  <Currency value={+data?.price} />
                </div>
                <h1 className="text-1xl font-bold ">{data.name}</h1>
                <div className="mt-3 flex items-end justify-between"></div>
                <div className="space-y-0">
                  {data.productProperties.map((pr, j) => (
                    <div
                      key={j}
                      className="mr-4 flex flex-col sm:flex-row w-full  sm:items-center justify-start space-x-2 rounded-lg
           bg-active-bg         px-2 py-0 dark:bg-dark-active-bg dark:text-white "
                    >
                      <div>
                        {pr.propertyName}
                        {": "}
                      </div>
                      <div>{pr.valueName}</div>
                    </div>
                  ))}
                </div>
                <hr className="my-4" />
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
            </div>
          </div>
          {/*  <hr className="my-10" /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
