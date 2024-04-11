import { db } from "@/lib/db";
import ProductCard from "./product-card";

export const revalidate = 0;

interface ProductsListProps {
  categorySlug: string | null;
  searchParams: any /* {
    colorId: string;
    sizeId: string;
  }; */;
}

const ProductsList: React.FC<ProductsListProps> = async ({
  categorySlug,
  searchParams,
}) => {
  console.log("searchParams from ProductsList: ", searchParams);
  const whereObject: any = categorySlug
    ? { category: { slug: categorySlug } }
    : {};

  let paramsArray: any = [];
  for (let x in searchParams) {
    //console.log(" from searchParams: ", x, searchParams[x]);
    switch (x) {
      case "price":
        whereObject.price = {
          gte: +searchParams[x].split("_")[0],
          lte: +searchParams[x].split("_")[1],
        };
        break;
      case "page":
        break;
      case "searchTerm":
        whereObject.name = {
          contains: searchParams.searchTerm,
          mode: "insensitive",
        };
        break;
      default:
        paramsArray.push({
          propertySlugS: x,
          valueSlugS: searchParams[x].split("_"),
        });
      /*   whereObject.productProperties = {
          some: {
            AND: [
              { propertySlug: { equals: x } },
              { valueSlug: { in: searchParams[x].split("_") } },
            ],
          },
        }; */
    }
  }
  //console.log("paramsArray from ProductsList: ", paramsArray);

  if (categorySlug) {
    const category = await db.category.findFirst({
      where: {
        slug: categorySlug || "",
      },
      include: {
        properties: { include: { values: true } },
      },
    });
    if (category) {
      /*  console.log(
        "category?.properties from ProductsList: ",
        category.properties
      ); */
      const optionsArray: any = [];
      for (let x of category.properties) {
        const par = paramsArray.find(
          (par1: any) => par1.propertySlugS == x.slug
        );
        //console.log("with parSlug par from ProductsList: ", x.slug, par);
        if (par) {
          optionsArray.push({
            AND: [
              { propertySlug: { equals: x.slug } },
              { valueSlug: { in: par.valueSlugS } },
            ],
          });
        } else {
          const tempVal = x.values.map((val) => val.slug);
          //console.log("tempVal from ProductsList: ", tempVal);
          optionsArray.push({
            AND: [
              { propertySlug: { equals: x.slug } },
              { valueSlug: { in: tempVal } },
            ],
          });
        }
      }
      //console.log("optionsArray from ProductsList: ", optionsArray);
      whereObject.productProperties = { every: { OR: optionsArray } };
    }
  }

  console.log("whereObject from ProductsList: ", whereObject);
  /*   console.log(
    "whereObject.productProperties.some.AND from ProductsList: ",
    whereObject.productProperties.some.AND
  ); */
  //for (let x of whereObject.productProperties.some.AND) { console.log("x[1].valueSlug from ProductsList: ",x[1].valueSlug);}
  const products = await db.product.findMany({
    where: whereObject,
    include: {
      category: true,
      images: true,
      productProperties: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  //console.log("products from ProductsList: ", products);

  return (
    <div className="w-full ml-1  mr-1 h-full">
      {/*  <div>Category: {categorySlug}</div>
      <div>searchParams.price: {searchParams.price}</div>
      <div>searchParams.searchTerm: {searchParams.searchTerm}</div> */}
      <div className="mt-0 lg:col-span-4 lg:mt-0">
        {products.length === 0 && (
          <div className="flex items-center justify-center h-full w-full  dark:text-cyan-400">
            No results found.
          </div>
        )}
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
