import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import { ProductCard } from "@/types";
import Currency from "@/components/currency";
import MyButton from "@/components/ui/my-button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { removeProduct } from "@/redux/cart/cartSlice";
import { DEFAULT_IMAGES } from "@/lib/utils";

interface CartItemProps {
  product: ProductCard;
  number: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, number }) => {
  const dispatch = useAppDispatch();
  console.log("  product, number  from CartItem: ", product, number);

  return (
    <div className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={product.data.images[0]?.url || DEFAULT_IMAGES[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          {/*  <IconButton onClick={onRemove} icon={<X size={15} />} /> */}
          <MyButton
            variant="icon"
            type="button"
            className=" "
            onClick={() => dispatch(removeProduct(product.data.id))}
          >
            <X className="h-4 w-4" />
          </MyButton>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {product.data.name}
            </p>
          </div>

          {/*    <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size.name}
            </p>
          </div> */}
          <Currency value={+product.data.price} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
