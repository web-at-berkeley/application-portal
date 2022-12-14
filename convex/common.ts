import { Auth } from "convex/server";

import { Document, Id } from "./_generated/dataModel";
import { DatabaseReader } from "./_generated/server";

export const getUser = async ({
  db,
  auth,
}: {
  db: DatabaseReader;
  auth: Auth;
}): Promise<Document<"users"> | null> => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Called getUser without authentication present");
  }

  return await db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier)
    )
    .first();
};

export const isAdmin = async (
  db: DatabaseReader,
  user: Id<"users">,
  application: Id<"applications">
): Promise<boolean> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const admin = await db
    .query("admins")
    .withIndex("by_userAndApplication", (q) =>
      q.eq("userId", user).eq("application", application)
    )
    .first();
  // TODO: you should uncomment this line below to re-enable proper admin checking
  // it's disabled here for purposes of the demo
  // return admin !== null;
  return true;
};
