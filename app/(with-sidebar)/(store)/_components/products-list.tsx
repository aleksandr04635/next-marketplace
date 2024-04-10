/* import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import ProductCard from '@/components/ui/product-card';
import NoResults from '@/components/ui/no-results';

import getProducts from "@/actions/get-products";
import getCategory from '@/actions/get-category';
import getSizes from '@/actions/get-sizes';
import getColors from '@/actions/get-colors';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters'; */

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
    console.log(" from searchParams: ", x, searchParams[x]);
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
    /* if (x == "price") {
      whereObject.price = {
        gte: +searchParams[x].split("_")[0],
        lte: +searchParams[x].split("_")[1],
      };
    } */
  }
  console.log("paramsArray from ProductsList: ", paramsArray);

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
      console.log(
        "category?.properties from ProductsList: ",
        category.properties
      );
      const optionsArray: any = [];
      /* for (let x of category.properties) {
        optionsArray.push();
      } */
      for (let x of category.properties) {
        //const par=paramsArray.indexOf()
        const par = paramsArray.find(
          (par1: any) => par1.propertySlugS == x.slug
        );
        console.log("with parSlug par from ProductsList: ", x.slug, par);
        if (par) {
          optionsArray.push({
            AND: [
              { propertySlug: { equals: x.slug } },
              { valueSlug: { in: par.valueSlugS } },
            ],
          });
        } else {
          const tempVal = x.values.map((val) => val.slug);
          console.log("tempVal from ProductsList: ", tempVal);
          optionsArray.push({
            AND: [
              { propertySlug: { equals: x.slug } },
              { valueSlug: { in: tempVal } },
            ],
          });
        }
      }
      console.log("optionsArray from ProductsList: ", optionsArray);
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
    where:
      // userId: user?.id || "",
      whereObject,

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
  /*  const products = await getProducts({ 
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId); */

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
      {/*  <Container>
        <Billboard 
          data={category.billboard}
        />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter
                valueKey="sizeId" 
                name="Sizes" 
                data={sizes}
              />
              <Filter 
                valueKey="colorId" 
                name="Colors" 
                data={colors}
              />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container> */}
    </div>
  );
};

export default ProductsList;
