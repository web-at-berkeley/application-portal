import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

export default mutation(async ({ db }): Promise<Id<"users">> => {
  // TODO: this is a placeholder
  const identity = {
    givenName: "John",
    familyName: "Doe",
    email: "john@doe.com",
    pictureUrl: "https://example.com/john.jpg",
    tokenIdentifier: "1234567890",
  };

  return db.insert("users", {
    firstName: identity.givenName,
    lastName: identity.familyName,
    email: identity.email,
    isAdmin: false,
    profilePic: identity.pictureUrl,
    tokenIdentifier: identity.tokenIdentifier,
  });
});
