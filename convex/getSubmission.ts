import { GenericId } from "convex/values";

import { Document } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(
  async (
    { db, auth },
    applicationId: string,
    submissionID?: string
  ): Promise<Document<"submissions"> | null> => {
    console.log("submissionID", submissionID);
    const identity = await auth.getUserIdentity();
    console.log("identity", identity);

    if (!identity) {
      throw new Error("Called getSubmission without authentication present");
    }

    if (submissionID) {
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
            q.eq(
              q.field("_id"),
              new GenericId<"submissions">("submissions", submissionID)
            ),
            q.eq(q.field("application"), application._id)
          )
        )
        .first();
      return submission;
    }
    let user: Document<"users"> | null;
    user = await db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
      .first();
    console.log("submissionID", submissionID);

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
          q.eq(q.field("user"), user!._id),
          q.eq(q.field("application"), application._id)
        )
      )
      .first();

    return submission;
  }
);
