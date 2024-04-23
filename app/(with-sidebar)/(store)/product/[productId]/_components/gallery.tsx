"use client";

import NextImage from "next/image";
import { Tab } from "@headlessui/react";

//import { Image } from "@/types";

import GalleryTab from "./gallery-tab";
import { Image } from "@prisma/client";

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className=" mt-3  w-full max-w-2xl  lg:max-w-none">
        {/* mx-auto */}
        <Tab.List className="grid grid-cols-4 gap-3">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className="aspect-square  bg-white relative h-full w-full sm:rounded-lg overflow-hidden">
              <NextImage
                fill
                src={image.url}
                alt="Image"
                className="object-contain object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
