"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImagePlus, Trash } from "lucide-react";
import MyButton from "@/components/ui/my-button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  moveLeft: (value: number) => void;
  moveRight: (value: number) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  moveLeft,
  moveRight,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {value.map((url, i) => (
          <div
            key={i}
            className="relative w-[170px] h-[170px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2 flex flex-row gap-1 ">
              {/* <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button> */}
              {i > 0 && (
                <MyButton
                  variant="icon"
                  type="button"
                  className=" "
                  onClick={() => moveLeft(i)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </MyButton>
              )}
              {i < value.length - 1 && (
                <MyButton
                  variant="icon"
                  className=" "
                  type="button"
                  onClick={() => moveRight(i)}
                >
                  <ChevronRight className="h-4 w-4" />
                </MyButton>
              )}
              <MyButton
                variant="icon"
                className=" "
                type="button"
                style="danger"
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </MyButton>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="azg8pxxs">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
