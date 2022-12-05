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
    .filter((q) => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
    .first();
};

export const isAdmin = async (
  db: DatabaseReader,
  user: Id<"users">,
  application: Id<"applications">
): Promise<boolean> => {
  const admin = await db
    .query("admins")
    .filter((q) =>
      q.and(
        q.eq(q.field("userId"), user),
        q.eq(q.field("application"), application)
      )
    )
    .first();
  console.log(admin);
  return admin !== null;
};
