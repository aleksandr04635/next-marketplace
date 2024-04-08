"use client";

import Link from "next/link";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import MyButton from "@/components/ui/my-button";

type Props = {};

const SignInButton = (props: Props) => {
  const location = usePathname();
  //const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrlFromUrl = searchParams.get("callbackUrl");

  //const currentSearch = searchParams.get("search");
  //console.log(" location from SignInButton: ", location);
  //console.log(" currentSearch from SignInButton: ", currentSearch);
  //console.log(" callbackUrlFromUrl from SignInButton: ", callbackUrlFromUrl);
  const encodedCallbackUrl = encodeURIComponent(
    callbackUrlFromUrl
      ? callbackUrlFromUrl
      : location + "?" + searchParams.toString()
  );
  //console.log(" encodedCallbackUrl from Header: ", encodedCallbackUrl);

  /*   const current = qs.parse(searchParams.toString());
  console.log(" current from SignInButton: ", current);
  console.log(
    " searchParams.toString() from SignInButton: ",
    searchParams.toString()
  ); */

  //const [encodedCallbackUrl, setEncodedCallbackUrl] = useState("");
  /*   useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const callbackUrlFromUrl = urlParams.get("callbackUrl");
    if (callbackUrlFromUrl) {
      console.log(" callbackUrlFromUrl from Header: ", callbackUrlFromUrl);
      setEncodedCallbackUrl(encodeURIComponent(callbackUrlFromUrl));
    } else {
      let callbackUrl = location;
      if (searchParams) {
        callbackUrl += searchParams;
      }
      console.log(" callbackUrl from Header: ", callbackUrl);
      //const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      setEncodedCallbackUrl(encodeURIComponent(callbackUrl));
    }
    //console.log(" encodedCallbackUrl from Header1: ", encodedCallbackUrl);
  }, [location]); */

  return (
    <Link className="" href={`/auth/login?callbackUrl=${encodedCallbackUrl}`}>
      <MyButton>Sign In</MyButton>
    </Link>
  );
};

export default SignInButton;
