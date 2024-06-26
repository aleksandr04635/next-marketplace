"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Category, Property, Value } from "@prisma/client";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MyButton from "@/components/ui/my-button";

/* export interface CategoryWithProperties extends Category {
  properties: (Property & { values: Value[] })[];
  _count: { products: number };
} */

export const StoreSidebarContent = ({
  categories,
}: {
  categories: (Category & {
    _count: { products: number };
    _min: number;
    _max: number;
    properties: (Property & { values: Value[] })[];
  })[];
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  //console.log("pathname from StoreSidebarContentr: ", pathname);
  //console.log("path from StoreSidebarContent: ", pathname?.split("/"));
  //const categorySelected: CategoryWithProperties | null | undefined =
  const categorySelected = categories.find(
    (cat) => cat.slug == pathname?.split("/")[2]
  );

  //let DEFAULT_PRICE = [0, 700] as [number, number];
  const valuesArr = categorySelected?.properties.map((pr, i) => pr.slug);
  //console.log("categorySelected from StoreSidebarContent: ", categorySelected);
  const [val, setVal] = useState(categorySelected ? valuesArr : ["categories"]);
  const [DEFAULT_PRICE, setDEFAULT_PRICE] = useState([0, 700]);
  console.log("DEFAULT_PRICE from StoreSidebarContent: ", DEFAULT_PRICE);

  const currentQ = qs.parse(searchParams.toString());
  currentQ.page = null; //NEW
  //console.log("currentQ from StoreSidebarContent: ", currentQ);

  //const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  //const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);

  const price = searchParams.get("price");
  const [minPrice, setMinPrice] = useState(
    price ? +price.split("_")[0] : DEFAULT_PRICE[0]
  );
  const [maxPrice, setMaxPrice] = useState(
    price ? +price.split("_")[1] : DEFAULT_PRICE[1]
  );

  useEffect(() => {
    //DEFAULT_PRICE[0] = categorySelected?._min as number;
    //DEFAULT_PRICE[1] = categorySelected?._max as number;
    setDEFAULT_PRICE([
      Math.floor(+(categorySelected?._min || 0) / 5) * 5,
      Math.ceil(+(categorySelected?._max || 700) / 5) * 5,
    ]);
    let price = searchParams.get("price");
    if (price) {
      setMinPrice(+price.split("_")[0]);
      setMaxPrice(+price.split("_")[1]);
    } else {
      setMinPrice(Math.floor(+(categorySelected?._min || 0) / 5) * 5);
      setMaxPrice(Math.ceil(+(categorySelected?._max || 700) / 5) * 5);
    }
    setVal(
      categorySelected
        ? categorySelected?.properties.map((pr, i) => pr.slug)
        : ["categories"]
    );
    console.log(
      "categorySelected from StoreSidebarContent: ",
      categorySelected
    );
  }, [categorySelected]);
  console.log("minPrice from StoreSidebarContent: ", minPrice);

  function isChecked(prslug: string, valslug: string) {
    const st = currentQ[prslug] as string;
    /*   console.log(
    "currentQ[pr.slug] from StoreSidebarContentr: ",
    st
  ); */
    const ind = st ? st.split("_").indexOf(valslug) : -1;
    if (ind != -1) {
      return true;
    } else {
      return false;
    }
  }

  /* NOT USED
  function changeCheck(pr: Property, val: Value) {
    const st = currentQ[pr.slug] as string;
    const query = { ...currentQ };
    const ind = st ? st.split("_").indexOf(val.slug) : -1;
    if (ind != -1) {
      query[pr.slug] = st.split("_").toSpliced(ind, 1).join("_");
    } else {
      query[pr.slug] = query[pr.slug]
        ? query[pr.slug] + "_" + val.slug
        : val.slug;
    }
    if (query[pr.slug] == "") {
      query[pr.slug] = null;
    }
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  } */

  // type="single"
  return (
    <div className=" p-1">
      <Accordion
        type="multiple"
        className="animate-none"
        /*  defaultValue={categorySelected ? valuesArr : ["categories"]} */
        value={val}
        onValueChange={(value) => setVal(value)}
      >
        <AccordionItem value="categories">
          <AccordionTrigger>
            <h3 className="font-semibold">Categories:</h3>
          </AccordionTrigger>
          <AccordionContent>
            {categories.map((cat, i) => (
              <div key={i} className=" w-full">
                <Link
                  href={"/category/" + cat.slug}
                  className={`  ${
                    pathname?.split("/")[2] == cat.slug
                      ? " text-cyan-500 dark:text-blue-500 text-base hover:no-underline "
                      : " link-stand "
                  }`}
                >
                  <div className="flex w-full flex-row justify-between">
                    <div className=" w-fit">{cat.name}</div>
                    <div className=" w-fit">{cat._count.products}</div>
                  </div>
                </Link>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {categorySelected && (
          <>
            <h3 className="font-semibold">{categorySelected.name}:</h3>
            <div className="flex justify-between mb-2">
              <p className="text-sm">Price</p>
              <div className="text-sm">
                {minPrice.toFixed(0)} $ - {maxPrice.toFixed(0)} $
              </div>
            </div>
            <Slider
              className="py-1 my-1 mb-2"
              onValueChange={(range: number[]) => {
                const [new1, new2] = range;
                setMinPrice(Math.min(new1, new2));
                setMaxPrice(Math.max(new1, new2));
              }}
              value={[minPrice, maxPrice]}
              min={DEFAULT_PRICE[0]}
              defaultValue={DEFAULT_PRICE}
              max={DEFAULT_PRICE[1]}
              step={5}
            />
            <MyButton
              variant="icon"
              className="mx-auto my-2 "
              onClick={() => {
                const query = { ...currentQ, price: minPrice + "_" + maxPrice };
                const url = qs.stringifyUrl(
                  {
                    url: window.location.href,
                    query,
                  },
                  { skipNull: true }
                );
                router.push(url);
              }}
            >
              Set price range
            </MyButton>
            {categorySelected.properties.map((pr, i) => (
              <AccordionItem key={i} value={pr.slug} className="border-b-0">
                <AccordionTrigger>
                  <h3 className="font-semibold">{pr.name}:</h3>
                </AccordionTrigger>
                <AccordionContent>
                  {pr.values.map((val, j) => (
                    /* https://www.w3schools.com/howto/howto_css_custom_checkbox.asp */
                    <div
                      key={j}
                      className="group checkbox-container flex items-center justify-center w-fit "
                      onClick={() => {
                        const st = currentQ[pr.slug] as string;
                        const query = { ...currentQ };
                        const ind = st ? st.split("_").indexOf(val.slug) : -1;
                        if (ind != -1) {
                          query[pr.slug] = st
                            .split("_")
                            .toSpliced(ind, 1)
                            .join("_");
                        } else {
                          query[pr.slug] = query[pr.slug]
                            ? query[pr.slug] + "_" + val.slug
                            : val.slug;
                        }
                        if (query[pr.slug] == "") {
                          query[pr.slug] = null;
                        }
                        const url = qs.stringifyUrl(
                          {
                            url: window.location.href,
                            query,
                          },
                          { skipNull: true }
                        );
                        router.push(url);
                      }}
                    >
                      <input
                        type="checkbox"
                        id={`${pr.slug}-${val.slug}`}
                        /*  onChange={() => {
                          const st = currentQ[pr.slug] as string;
                          const query = { ...currentQ };
                          const ind = st ? st.split("_").indexOf(val.slug) : -1;
                          if (ind != -1) {
                            query[pr.slug] = st
                              .split("_")
                              .toSpliced(ind, 1)
                              .join("_");
                          } else {
                            query[pr.slug] = query[pr.slug]
                              ? query[pr.slug] + "_" + val.slug
                              : val.slug;
                          }
                          if (query[pr.slug] == "") {
                            query[pr.slug] = null;
                          }
                          const url = qs.stringifyUrl(
                            {
                              url: window.location.href,
                              query,
                            },
                            { skipNull: true }
                          );
                          router.push(url);
                        }} */
                        checked={isChecked(pr.slug, val.slug)}
                        className="h-4 w-4  rounded
                         border-blue-500 dark:border-cyan-500 text-indigo-600 focus:ring-indigo-500"
                      />

                      <label
                        htmlFor={`${pr.slug}-${val.slug}`}
                        className="ml-0 flex items-center justify-center text-sm cursor-pointer
                         dark:text-cyan-500 text-blue-500 group-hover:text-cyan-500 dark:group-hover:text-blue-500"
                      >
                        {val.name}
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </>
        )}
      </Accordion>
      {/*  <div className="flex gap-y-2 flex-col ">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href="/admin">Admin</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>*/}
    </div>
  );
};
