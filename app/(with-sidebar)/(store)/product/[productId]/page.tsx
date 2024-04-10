import { db } from "@/lib/db";
import ProductComponent from "./_components/product-component";

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await db.product.findFirst({
    where: { id: params.productId },
    include: {
      category: true,
      images: true,
      productProperties: true,
    },
  });

  if (!product) {
    return null;
  }

  return (
    <ProductComponent data={product} />
    /* <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-2xl text-gray-900">
                    <Currency value={product?.price} />
                  </p>
                </div>
                <hr className="my-4" />
                <div className="flex flex-col gap-y-6">
                  <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Size:</h3>
                    <div>{product?.size?.value}</div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <h3 className="font-semibold text-black">Color:</h3>
                    <div
                      className="h-6 w-6 rounded-full border border-gray-600"
                      style={{ backgroundColor: product?.color?.value }}
                    />
                  </div>
                </div>
                <div className="mt-10 flex items-center gap-x-3">
                  <Button
                    onClick={onAddToCart}
                    className="flex items-center gap-x-2"
                  >
                    Add To Cart
                    <ShoppingCart size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-10" />
        </div>
      </div>
    </div> */
  );
};

export default ProductPage;
