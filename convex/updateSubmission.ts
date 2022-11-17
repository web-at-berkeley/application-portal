import { GenericId } from "convex/values";

import { createDefaultSubmission } from "../src/utils";

import { Document } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

export default mutation(
  async (
    { db, auth },
    applicationId: string,
    fieldName: string,
    fieldValue: string | boolean | string[]
  ) => {
    // The `UserIdentity` returned from `auth.getUserIdentity` is just an ephemeral
    // object representing the identity of the authenticated user; most applications
    // will want to store this in a `users` table to reference it in their other
    // tables.
    //
    // The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
    // to look up identities, but inserting the value into a table also gives us an
    // `_id` field.
    //
    // Keep in mind that `UserIdentity` has a number of optional fields, the
    // presence of which depends on the identity provider chosen. It's up to the
    // application developer to determine which ones are available and to decide
    // which of those need to be persisted.
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called updateSubmission without authentication present");
    }

    const user: Document<"users"> | null = await db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
      .first();

    if (!user) {
      throw new Error("User is not in the database!");
    }

    const application: Document<"applications"> | null = await db
      .query("applications")
      .filter((q) =>
        q.eq(
          q.field("_id"),
          new GenericId<"applications">("applications", applicationId)
        )
      )
      .first();

    if (!application) {
      throw new Error("application does not exist");
    }

    // Check if we've already stored this identity before.
    const submission: Document<"submissions"> | null = await db
      .query("submissions")
      .filter((q) =>
        q.and(
          q.eq(q.field("user"), user._id),
          q.eq(q.field("application"), application._id)
        )
      )
      .first();

    if (submission === null) {
      const fieldsMap = createDefaultSubmission(application);
      console.log(fieldsMap);
      fieldsMap.set(fieldName, fieldValue);
      await db.insert("submissions", {
        user: user._id,
        application: application._id,
        submitted: false,
        fields: fieldsMap,
      });
    } else {
      submission.fields.set(fieldName, fieldValue);
      db.patch(submission._id, { fields: submission.fields });
    }
  }
);
