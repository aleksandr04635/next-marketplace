"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { CategoryWithProperties } from "./product-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormLabel } from "@/components/ui/form";

interface PropertiesControlProps {
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

const PropertiesControl: React.FC<PropertiesControlProps> = ({
  disabled,
  onChange,
  category,
  value,
}) => {
  //console.log("value from PropertiesControl:", value);
  //console.log("category from PropertiesControl:", category);
  const [properties, setProperties] = useState<Property[]>(value);
  //console.log("properties from PropertiesControl:", properties);

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
              //console.log("temp from PropertiesControl:", temp);
              setProperties(temp);
              onChange(temp);
            }}
            /*  defaultValue={properties[i]?.valueName || ""} */
            /* defaultValue={value[i]?.valueName || ""} */
            defaultValue={prop.values[0].name || ""}
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
    </div>
  );
};

export default PropertiesControl;
