import { Document, Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";
import { getUser } from "./common";

export default mutation(async ({ db, auth }): Promise<Id<"users">> => {
  // Check if we've already stored this identity before.
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Called getUser without authentication present");
  }

  const user: Document<"users"> | null = await getUser({ db, auth });

  if (user !== null) {
    // If we've seen this identity before but the name has changed, patch the value.
    if (
      user.firstName !== identity.givenName ||
      user.lastName !== identity.familyName ||
      user.email !== identity.email ||
      user.profilePic !== identity.pictureUrl
    ) {
      await db.patch(user._id, {
        firstName: identity.givenName!,
        lastName: identity.familyName!,
        email: identity.email!,
        profilePic: identity.pictureUrl!,
      });
    }
    return user._id;
  }
  // If it's a new identity, create a new `User`.
  return db.insert("users", {
    firstName: identity.givenName!,
    lastName: identity.familyName!,
    email: identity.email!,
    profilePic: identity.pictureUrl!,
    tokenIdentifier: identity.tokenIdentifier,
    // The `_id` field will be assigned by the backend.
  });
});
