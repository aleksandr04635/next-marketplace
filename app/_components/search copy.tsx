"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";

type Props = { type: string };

const SearchFormForHeader = ({ type }: Props) => {
  //const { pageSize } = useSelector((state) => state.pageSize);
  const router = useRouter();

  const searchParams = useSearchParams();
  //const callbackUrl = searchParams.get("callbackUrl");
  //searchParams.toString()

  const [searchTerm, setSearchTerm] = useState("");
  //console.log(" searchTerm from SearchForm: ", searchTerm);

  useEffect(() => {
    //console.log("urlParams in header: ", urlParams);
    const searchTermFromUrl = searchParams.get("searchTerm");
    setSearchTerm(searchTermFromUrl || "");
    /* if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    } */
  }, [searchParams]);

  const handleSubmit = (e: any) => {
    //console.log("window.location.href in header: ", window.location.href);
    //console.log("window.location.origin in header: ", window.location.origin);
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

      /*   
      urlParams.set("searchTerm", searchTerm);
      urlParams.set("page", "");

      //urlParams.set("pageSize", pageSize);

      //searchParams.set("searchTerm", searchTerm);
      //const searchQuery = urlParams.toString();
      router.push(`/?${searchParams.toString()}`) */
    }
  };

  //overflow-hidden
  return (
    <form
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
    </form>
  );
};

export default SearchFormForHeader;
