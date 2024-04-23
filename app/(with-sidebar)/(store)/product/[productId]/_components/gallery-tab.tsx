import NextImage from "next/image";
import { Tab } from "@headlessui/react";

import { cn } from "@/lib/utils";
import { Image } from "@prisma/client";
//import { Image } from "@/types";

interface GalleryTabProps {
  image: Image;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative outline-none flex aspect-square cursor-pointer items-center justify-center rounded-md ">
      {({ selected }) => (
        <div>
          <span className="absolute bg-white h-full w-full aspect-square inset-0  overflow-hidden rounded-md">
            <NextImage
              fill
              src={image.url}
              alt=""
              className="object-contain object-center"
            />
          </span>
          <span
            /*  className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-0",
              selected ? "ring-cyan-500 dark:ring-blue-500" : "ring-transparent"
            )} 
             selected ? " border-4 border-cyan-500 dark:border-blue-500  " : ""
             */
            /* className={cn(
              "absolute inset-0 rounded-md ring-4 ring-offset-0 !outline-none overflow-hidden  ",
              selected
                ? "ring-cyan-500 dark:ring-blue-500 focus:ring-4 "
                : " ring-transparent "
            )} */
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-0  ",
              selected
                ? " ring-cyan-500 dark:ring-blue-500 focus:ring-2 "
                : " ring-transparent "
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
