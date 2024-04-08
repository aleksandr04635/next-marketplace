"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormLabel } from "@/components/ui/form";
import { CategoryWithProperties } from "./product-form";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: { propertyName: string; valueName: string }[]) => void;
  category: CategoryWithProperties;
  value: { propertyName: string; valueName: string }[];
}
interface Property {
  propertyName: string;
  valueName: string;
}
interface Properties {
  propertyName: string;
  valueName: string;
}
[];

const PropertiesControl: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  category,
  value,
}) => {
  console.log("value from PropertiesControl:", value);
  //console.log("category from PropertiesControl:", category);
  const [properties, setProperties] = useState<Property[]>(value);
  console.log("properties from PropertiesControl:", properties);

  const [isMounted, setIsMounted] = useState(false);
  /*   useEffect(() => {
    onChange(properties);
  }, [properties]); */
  useEffect(() => {
    setProperties(value);
  }, [value]);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  /*   const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  }; */

  return (
    <div>
      {category.properties.map((prop, i) => (
        <div key={i}>
          <FormLabel>{prop.name}</FormLabel>
          {/*  <Select onValueChange={field.onChange} defaultValue={field.value}> */}
          <Select
            onValueChange={(val) => {
              console.log("val from PropertiesControl:", val);
              const temp = properties.map((p, n) => {
                return n == i ? { propertyName: prop.name, valueName: val } : p;
              });
              temp[i] = { propertyName: prop.name, valueName: val };
              console.log("temp from PropertiesControl:", temp);
              setProperties(temp);
              onChange(temp);
            }}
            defaultValue={properties[i]?.valueName || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder={prop.name} />
            </SelectTrigger>

            <SelectContent>
              {prop.values.map((val, j) => (
                <SelectItem key={j} value={val.name}>
                  {val.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      {/*    <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
      {/* <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button type="button" variant="destructive" size="sm">
                <Trash className="h-4 w-4" />
              </Button>
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
      </CldUploadWidget> */}
    </div>
  );
};

export default PropertiesControl;
