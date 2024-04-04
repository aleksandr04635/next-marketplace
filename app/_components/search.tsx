"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

type Props = { type: string };

const SearchFormForHeader = ({ type }: Props) => {
  //const { pageSize } = useSelector((state) => state.pageSize);
  const router = useRouter();

  const searchParams = useSearchParams();
  //const callbackUrl = searchParams.get("callbackUrl");
  //searchParams.toString()

  const [searchTerm, setSearchTerm] = useState("");
  //console.log(" searchTerm from SearchForm: ", searchTerm);
  const searchTermFromUrl = searchParams.get("searchTerm") as string;
  // setSearchTerm(searchTermFromUrl || "");

  const SearchSchema = z.object({
    search: z.string(),
  });

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      search: searchTermFromUrl,
    },
  });

  /* if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    } */
  useEffect(() => {
    //console.log("urlParams in header: ", urlParams);
    const searchTermFromUrl = searchParams.get("searchTerm");
    setSearchTerm(searchTermFromUrl || "");
    form.setValue("search", searchTermFromUrl || "");
  }, [searchParams]);

  const handleSubmit = (e: any) => {
    //console.log("window.location.href in header: ", window.location.href);
    //console.log("window.location.origin in header: ", window.location.origin);
    //console.log("handleSubmit in header, e: ", e);
    //console.log("searchTerm in header, e: ", searchTerm);
    //console.log("form in header, e: ", form);
    if (searchTerm) {
      e.preventDefault();
      const current = qs.parse(searchParams.toString());
      const query = {
        ...current,
        ["searchTerm"]: searchTerm,
      };
      /*  if (current[valueKey] === id) {
        query[valueKey] = null;
      } */
      const url = qs.stringifyUrl(
        {
          url: window.location.origin,
          query,
        },
        { skipNull: true }
      );
      router.push(url);
    }
  };

  //overflow-hidden
  return (
    <Form {...form}>
      <form /* it's just a native form element */
        //onSubmit={form.handleSubmit(handleSubmit)}
        onSubmit={handleSubmit}
        className={
          "w-full   md:w-[300px] " +
          (type == "wide-scr"
            ? "relative hidden  md:inline "
            : "relative mx-auto mt-1   md:hidden")
        }
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Search"
                      type="text"
                      onChange={(ev) => {
                        setSearchTerm(ev.target.value);
                        field.onChange(ev);
                      }}
                    />
                    {/* <p className="absolute right-[-20px] top-[8px] h-10 w-12 cursor-pointer border-none text-xl">
                      S
                    </p> */}
                    <Button
                      size="sm"
                      type="submit"
                      variant="link"
                      onClick={handleSubmit}
                      asChild
                      className="absolute right-[-5px] top-[8px] h-6 w-10 cursor-pointer border-none text-xl"
                    >
                      <AiOutlineSearch />
                    </Button>
                  </div>
                </FormControl>
                {/* <Button
                  size="sm"
                  type="submit"
                  variant="link"
                  asChild
                  className="px-0 font-normal"
                >
                  <AiOutlineSearch />
                </Button> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default SearchFormForHeader;

{
  /*  <form
      onSubmit={handleSubmit}
      className={
        "w-full   md:w-[300px] " +
        (type == "wide-scr"
          ? "relative hidden  md:inline "
          : "relative mx-auto mt-1   md:hidden")
      }
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full  rounded-lg border
         border-main-border py-1.5 focus:border-main-border focus:ring-1 focus:ring-main-border dark:bg-dark-active-bg 
          md:w-[300px]"
      />
      <p
        onClick={handleSubmit}
        className="absolute right-[-1px] top-[10px] h-6 w-7 cursor-pointer border-none text-xl"
      >
        <AiOutlineSearch />
      </p>
    </form> */
}
