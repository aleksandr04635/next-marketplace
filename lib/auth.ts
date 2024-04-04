import { auth } from "@/auth";
//for server comp
export const currentUser = async () => {
  const session = await auth();
  //console.log("session from @/auth from currentUser: ", session);
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
