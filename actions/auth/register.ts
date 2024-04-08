"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (
  values: z.infer<typeof RegisterSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    //ADD HERE STORE NAME
    data: {
      name,
      email,
      storeName: name + "'s store",
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  //console.log("verificationToken from register: ", verificationToken);
  //console.log("callbackUrl from register: ", callbackUrl);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    callbackUrl
  );

  return { success: "Confirmation email sent!" };
};
