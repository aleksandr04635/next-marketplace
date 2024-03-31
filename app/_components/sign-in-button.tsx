"use client";

import Link from "next/link";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import MyButton from "@/components/my-button";

type Props = {};

const SignInButton = (props: Props) => {
  const location = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrlFromUrl = searchParams.get("callbackUrl");
  //const currentSearch = qs.parse(searchParams.toString());
  const currentSearch = searchParams.get("search");
  console.log(" location from SingInButton: ", location);
  //console.log(" router from SingInButton: ", router);
  console.log(" currentSearch from SingInButton: ", currentSearch);
  console.log(" callbackUrlFromUrl from SingInButton: ", callbackUrlFromUrl);
  /*   const callbackUrlFromUrl = searchParams.get("callbackUrl");*/
  const encodedCallbackUrl = encodeURIComponent(
    callbackUrlFromUrl
      ? callbackUrlFromUrl
      : location + (currentSearch ? currentSearch : "")
  );
  //const [encodedCallbackUrl, setEncodedCallbackUrl] = useState("");

  console.log(" encodedCallbackUrl from Header: ", encodedCallbackUrl);

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
