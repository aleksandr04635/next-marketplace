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
import { Metadata } from "next";
import { CategoryPageProps } from "@/types";
import ProductsList from "../../_components/products-list";
import { db } from "@/lib/db";

//export const revalidate = 0;

/* export const metadata: Metadata = {
  title: "Category | My Marketplace",
  description: "A marketplace created with Next.js 14 and Prisma",
}; */
export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const category = await db.category.findFirst({
    where: {
      slug: params.categorySlug || "",
    },
  });
  //console.log("category from CategoryPage: ", category);
  const str = category?.name || "";
  return {
    title: `${str} | My Marketplace`,
    description: "A marketplace created with Next.js 14 and Prisma",
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  //console.log("searchParams from CategoryPage: ", searchParams);
  /*  const products = await getProducts({ 
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId); */

  // <div className="w-full h-full p-2 pl-0 lg:pl-2">
  return (
    <div className="w-full h-full ">
      <ProductsList
        categorySlug={params.categorySlug}
        searchParams={searchParams}
      />

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

export default CategoryPage;
