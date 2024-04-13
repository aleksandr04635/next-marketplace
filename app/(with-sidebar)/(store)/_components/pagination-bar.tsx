"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import qs from "query-string";

import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import { HiMiniArrowSmallRight } from "react-icons/hi2";
import { PAGE_SIZE } from "@/lib/utils";
import { PrefetchRSCPathnameNormalizer } from "next/dist/server/future/normalizers/request/prefetch-rsc";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function PaginationBar({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQ = qs.parse(searchParams.toString());
  //const { pageSize: pageSizeStore } = useSelector((state) => state.pageSize);
  //const pageSize = PAGE_SIZE;
  console.log("currentQ: ", currentQ);
  console.log("currentPage: ", currentPage);
  console.log("totalPages: ", totalPages);
  if (totalPages <= 1) {
    return (
      <>
        <span></span>
      </>
    );
  }

  const cName = (n: number) => {
    let cn =
      "  border border-main-border px-2 dark:text-white outline-main-border  outline-1 hover:outline";
    if (n == currentPage) {
      cn += " dark:bg-dark-active-bg bg-active-bg";
    }
    if (n != currentPage) {
      cn +=
        " dark:bg-dark-additional-bg/60 dark:hover:bg-dark-active-bg hover:bg-active-bg ";
    }
    if (n == totalPages) {
      cn += " rounded-r-lg ";
    }
    if (n == 1) {
      cn += " rounded-l-lg ";
    }
    if (n == totalPages + 1) {
      cn += " rounded-r-lg px-1 sm:px-5 ml-2 sm:ml-5";
      /*   if (currentPage == totalPages) {
        cn += " invisible cursor-default";
      } */
    }
    if (n == 0) {
      cn += " rounded-l-lg px-1 sm:px-5 mr-2 sm:mr-5";
    }
    return cn;
  };

  console.log("pathname from PaginationBar: ", pathname);
  console.log(
    " window.location.href from PaginationBar: ",
    window.location.href
  );
  console.log(
    " window.location.origin from PaginationBar: ",
    window.location.origin
  );
  const makeQuery = (page: number) => {
    const query = { ...currentQ, page: page };
    const url = qs.stringifyUrl(
      {
        url: window.location.origin + pathname,
        query,
      },
      { skipNull: true }
    );
    return url;
    //router.push(url);
    /*     let urlParams = new URLSearchParams(location.search);
    urlParams.set("page", page);
    urlParams.set("pageSize", pageSizeStore);
    return location.pathname + "?" + urlParams.toString(); */
  };

  //const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  //const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));
  //const maxPage = Math.min(totalPages, Math.max(currentPage + 3, 6));
  //const minPage = Math.max(1, Math.min(currentPage - 3, maxPage - 5));
  const numberOfLinksOnTheSidesOfTheCurrentPageWhenItIsInTheMiddleGroup = 2;
  const maximalLengthOfASideGrourOfLinks = 2;
  const maxPageInCentralGroup = Math.min(
    totalPages,
    Math.max(
      currentPage +
        numberOfLinksOnTheSidesOfTheCurrentPageWhenItIsInTheMiddleGroup,
      maximalLengthOfASideGrourOfLinks
    )
  );
  const minPageInCentralGroup = Math.max(
    1,
    Math.min(
      currentPage -
        numberOfLinksOnTheSidesOfTheCurrentPageWhenItIsInTheMiddleGroup,
      totalPages - maximalLengthOfASideGrourOfLinks + 1
      //maxPageInCentralGroup -
      //  (numberOfLinksOnTheSidesOfTheCurrentPageWhenItIsInTheMiddleGroup + 1),
      //maximalLengthOfASideGrourOfLinks,
    )
  );
  //correction for a case when only one empty spot exists between the central group and a side group
  let minPage = minPageInCentralGroup;
  let maxPage = maxPageInCentralGroup;
  if (minPage == 3) {
    minPage = 2;
  }
  if (maxPage == totalPages - 2) {
    maxPage = totalPages - 1;
  }
  /*   console.log(" minPageInCentralGroup: ", minPageInCentralGroup);
  console.log("maxPageInCentralGroup: ", maxPageInCentralGroup);
  console.log(" minPage: ", minPage);
  console.log("maxPage: ", maxPage); */
  const numberedPageItems = [];
  for (let page = minPage; page <= maxPage; page++) {
    //for (let page = maxPage; page >= minPage; page--) {
    numberedPageItems.push(
      currentPage === page ? (
        <div key={page} className={cName(page)}>
          {page}
        </div>
      ) : (
        <Link key={page} href={`${makeQuery(page)}`} className="">
          <div className={cName(page)}>{page}</div>
        </Link>
      )
    );
  }

  return (
    <>
      {/* <div className=" hidden sm:block"> */}
      <div className="ml-0.5 flex flex-row">
        {currentPage > 1 && (
          <Link href={`${makeQuery(currentPage - 1)}`} key={0}>
            <div className={cName(0)}>
              <HiMiniArrowSmallLeft className="text-2xl" />
            </div>
          </Link>
        )}
        {minPage > 1 && (
          <Link href={`${makeQuery(1)}`} key={1}>
            <div className={cName(1)}>{1}</div>
          </Link>
        )}
        {minPage > 2 && <div className="px-2 ">...</div>}
        {numberedPageItems}
        {maxPage < totalPages - 1 && <div className="px-2 ">...</div>}
        {maxPage < totalPages && (
          <Link href={`${makeQuery(totalPages)}`} key={totalPages}>
            <div className={cName(totalPages)}>{totalPages}</div>
          </Link>
        )}
        {currentPage < totalPages && (
          <Link href={`${makeQuery(currentPage + 1)}`} key={totalPages + 1}>
            <div className={cName(totalPages + 1)}>
              <HiMiniArrowSmallRight className="text-2xl" />
            </div>
          </Link>
        )}
      </div>
    </>
  );
}
