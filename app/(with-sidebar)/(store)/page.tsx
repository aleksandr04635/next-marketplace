import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import ProductsList from "./_components/products-list";
import { CategoryPageProps } from "@/types";

/* const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
}); */

const HomePage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  //console.log("searchParams from CategoryPage: ", searchParams);

  return <ProductsList categorySlug={null} searchParams={searchParams} />;
};
export default HomePage;
