import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();
  //console.log("session from next-auth/react from useCurrentUser: ", session);
  return session.data?.user;
};
