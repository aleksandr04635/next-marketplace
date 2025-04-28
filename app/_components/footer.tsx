"use client";
//import { Footer } from "flowbite-react";
import Link from "next/link";
//import { Link, useLocation } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
//import { useSelector, useDispatch } from "react-redux";

export const Footer = () => {
  //const { pageSize } = useSelector((state) => state.pageSize);
  //const location = useLocation();
  //console.log(" window.location.origin: ", window.location.origin);
  //dark:bg-transparent

  //absolute bottom-0  bg-secondary
  return (
    <div className="absolute bottom-0 flex h-16 w-full flex-col items-center justify-between rounded-none border-t border-layout-border bg-white pr-[20px] sm:flex-row dark:bg-dark-additional-bg/40">
      <Link
        className="link-stand mx-10"
        /*  href={window.location.origin + `?pageSize=${pageSize}`} */
        href="/"
        target="_blank"
        rel="noopener noreferrer"
      >
        &copy; {new Date().getFullYear()} My&nbsp;Marketplace
      </Link>

      <Link
        className="link-stand text-base"
        href={`https://oleksandrs-resume.vercel.app`}
        target="_blank"
        rel="noopener noreferrer"
      >
        My&nbsp;CV&nbsp;and&nbsp;contacts
      </Link>

      <Link
        className="link-stand mx-10"
        target="_blank"
        rel="noopener noreferrer"
        href={"https://github.com/aleksandr04635"}
      >
        <BsGithub className="h-6 w-6" />
      </Link>
    </div>
  );
};
