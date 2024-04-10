import {
  Category,
  Product,
  productProperty,
  Image as ImageType,
} from "@prisma/client";

export interface CategoryPageProps {
  params: {
    categorySlug: string | null;
  };
  searchParams: any /* {
      colorId: string;
      sizeId: string;
    }; */;
}

export interface ProductCard {
  data: Product & {
    images: ImageType[];
    category: Category;
    productProperties: productProperty[];
  };
}
