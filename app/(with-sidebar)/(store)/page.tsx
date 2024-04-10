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
  console.log("searchParams from CategoryPage: ", searchParams);
  /*  const products = await getProducts({ 
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId); */

  return <ProductsList categorySlug={null} searchParams={searchParams} />;
};
export default HomePage;
/* export default function Home() {
  return (
     //<main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"> 
    <main className="flex h-full flex-col items-center justify-center ">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <div>
          <LoginButton asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
 */
