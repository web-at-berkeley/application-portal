import { AppProps } from "next/app";
import { useEffect, useState } from "react";

import { useMutation } from "../../../convex/_generated/react";
import { Id } from "../../../convex/_generated/dataModel";

export default function AuthProtector({
  Component,
  pageProps,
}: Partial<AppProps>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const storeUser = useMutation("storeUser");
  useEffect(() => {
    // Store the user in the database.
    // Recall that `storeUser` gets the user information via the `auth`
    // object on the server. You don't need to pass anything manually here.
    async function createUser() {
      const id = await storeUser();
      setUserId(id);
    }
    createUser();
    return () => setUserId(null);
  }, [storeUser]);
  if (Component !== undefined) {
    return <Component {...pageProps} />;
  } else {
    return <></>;
  }
}
