import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    image: z.optional(z.string()),
    name: z.optional(z.string().min(4)),
    storeName: z.optional(z.string().min(6)),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  /*  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "To change a password enter your current one and a new one!",
      path: ["newPassword"],
    }
  ) */
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "To change a password enter your current one!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(4, {
    message: "Minimum 4 characters required",
  }),
});

export const productFormSchema = z
  .object({
    name: z.string().min(3),
    images: z.object({ url: z.string() }).array(),
    productProperties: z
      .object({ propertyName: z.string().min(2), valueName: z.string().min(2) })
      .array(),
    number: z.coerce.number().min(1),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    description: z.string().min(3),
  })
  .refine(
    //UNCOMMENT IN PRODUCTION
    (data) => {
      if (data.images.length == 0) {
        return false;
      }
      return true;
    },
    {
      message: "Add at least one image",
      path: ["images"],
    }
  );
