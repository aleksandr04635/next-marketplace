"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import Currency from "../../../../components/currency";
import Link from "next/link";
import { ProductCard } from "@/types";

//import IconButton  from "@/components/ui/icon-button";
//import usePreviewModal from "@/hooks/use-preview-modal";
//import useCart from "@/hooks/use-cart";
//import { Product } from "@/types";

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  //const previewModal = usePreviewModal();
  //const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    // previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    // cart.addItem(data);
  };

  // group cursor-pointer overflow-hidden relative  h-full h-[170px]
  return (
    <div
      className="bg-white dark:bg-dark-additional-bg/40 overflow-hidden  rounded-lg
     border dark:border-main-border h-full "
    >
      <div className="aspect-square bg-gray-100 relative">
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
            fill
            className="aspect-square object-cover border-0"
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
      <div className="flex flex-col justify-between h-[230px]  p-2 space-y-1">
        <Link
          href={`/product/${data?.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-stand cursor-pointer"
        >
          <p className="font-semibold text-lg">{data.name}</p>{" "}
        </Link>
        <div className="flex items-center justify-between">
          <Currency value={+data?.price} />
        </div>
        <p className="text-sm text-gray-500">{data.category?.name}</p>

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
        {/* Price & Reiew */}
      </div>
    </div>
  );
};

export default ProductCard;
