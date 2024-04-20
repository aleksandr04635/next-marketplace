//"use server";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/app/_components/user-button";
import { StoreSidebarContent } from "./store-sidebar-content";
import { db } from "@/lib/db";
/* interface StoreSidebarProps {
  params: {
    categorySlug: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}
{
  params,
  searchParams,
} 
: React.FC<StoreSidebarProps> 
*/
export const StoreSidebar = async () => {
  /*   const headersList = headers();
  const domain = headersList.get("host");
  const fullUrl = headersList.get("referer");
  const pathname = headersList.get("next-url");
  console.log("headersList:", headersList);
  console.log("fullUrl:", fullUrl);
  console.log("pathname:", pathname); */

  /*   const max = await db.product.aggregate({
    _max: {
      price: true,
    },
    _min: {
      price: true,
    },
  });
  console.log("max from StoreSidebar: ", max); */

  const categories = await db.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
      properties: { include: { values: true } },
      //products: true,
    },
    orderBy: {
      products: { _count: "desc" },
      //createdAt: "desc",
    },
  });

  const categories2 = [];
  for (let cat of categories) {
    //console.log("cat from StoreSidebar: ", cat);
    const sides = await db.product.aggregate({
      where: { categoryId: cat.id },
      _max: {
        price: true,
      },
      _min: {
        price: true,
      },
    });
    //console.log("sides from StoreSidebar: ", sides);
    // cat._max = sides._max.price;
    //cat._min = sides._min.price;
    categories2.push({
      ...cat,
      _max: sides._max.price as unknown as number,
      _min: sides._min.price as unknown as number,
    });
  }

  // console.log("categories2 from StoreSidebar: ", categories2);
  /*   const categories = await db.category.findMany({
    include: {
           _count: {
        select: { products: true },
      },
      properties: { include: { values: true } },
      //products: true,
    },
    orderBy: {
      products: { _count: "desc" },
      //createdAt: "desc",
    },
  }); */

  /*  const formattedCategories: ProductColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    userId: item.userId,
    number: item.number,
    imagesNumber: item.images.length,
    description: item.description,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    properties: item.productProperties.map((pr) => {
      return {
        propertyName: pr.propertyName,
        valueName: pr.valueName,
      };
    }),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  })) */

  return (
    <div>
      <StoreSidebarContent categories={categories2} />
    </div>
  );
};
