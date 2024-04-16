import { db } from "@/lib/db";
import ProductCard from "./product-card";
import { PAGE_SIZE } from "@/lib/utils";
import PaginationBar from "./pagination-bar";
//import { useState } from "react";

export const revalidate = 0;

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category2 | My Marketplace",
  description: "A marketplace created with Next.js 14 and Prisma",
};
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
  //console.log("searchParams from ProductsList: ", searchParams);
  /* const [page, setPage] = useState(1);
  console.log("page from ProductsList: ", page); */

  const whereObject: any = categorySlug
    ? { category: { slug: categorySlug }, number: { gte: 0 } }
    : { number: { gte: 0 } };

  let page = 1;
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
        //setPage(parseInt(searchParams.page));
        page = parseInt(searchParams.page);
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
  //console.log("page from ProductsList: ", page);

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

  // console.log("whereObject from ProductsList: ", whereObject);
  /*   console.log(
    "whereObject.productProperties.some.AND from ProductsList: ",
    whereObject.productProperties.some.AND
  ); */
  //for (let x of whereObject.productProperties.some.AND) { console.log("x[1].valueSlug from ProductsList: ",x[1].valueSlug);}

  const totaProductsCount = await db.product.count({ where: whereObject });
  const totalPages = Math.ceil(totaProductsCount / PAGE_SIZE);
  //whereObject.skip = (page - 1) * pageSize;
  //whereObject.take = pageSize;
  //console.log("totaProductsCount from ProductsList: ", totaProductsCount);

  const products = await db.product.findMany({
    where: whereObject,
    include: {
      category: true,
      images: true,
      productProperties: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });
  //console.log("products from ProductsList: ", products);

  return (
    <div className="w-full ml-1  mr-1 mt-1 mb-1 h-full pt-1 md:pt-3">
      {/*  <div>Category: {categorySlug}</div>
      <div>searchParams.price: {searchParams.price}</div>
      <div>searchParams.searchTerm: {searchParams.searchTerm}</div> */}
      <div className="">
        Total number of products, corresponding to your query:{" "}
        {totaProductsCount}
      </div>
      <PaginationBar currentPage={page} totalPages={totalPages} />
      <div className=" lg:col-span-4 my-2 lg:pr-4 ">
        {/*   {products.length === 0 && (
          <div className="flex items-center justify-center h-full w-full  dark:text-cyan-400">
            No results found.
          </div>
        )} */}
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      </div>
      <PaginationBar currentPage={page} totalPages={totalPages} />
    </div>
  );
};

export default ProductsList;
