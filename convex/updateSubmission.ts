import { createDefaultSubmission } from "../src/utils";

import { Document, Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";
import { getUser } from "./common";

export default mutation(
  async (
    { db, auth },
    applicationId: string,
    fieldName: string,
    fieldValue: string | boolean | string[],
    isSubmitted: boolean
  ) => {
    const user: Document<"users"> | null = await getUser({ db, auth });

    if (!user) {
      throw new Error("User is not in the database!");
    }

    const application: Document<"applications"> | null = await db
      .query("applications")
      .filter((q) =>
        q.eq(
          q.field("_id"),
          new Id<"applications">("applications", applicationId)
        )
      )
      .first();

    if (!application) {
      throw new Error("application does not exist");
    }

    // Check if we've already stored this submission before.
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
      fieldsMap.set(fieldName, fieldValue);
      await db.insert("submissions", {
        user: user._id,
        application: application._id,
        submitted: false,
        fields: fieldsMap,
      });
    } else if (isSubmitted) {
      db.patch(submission._id, { submitted: isSubmitted });
    } else {
      submission.fields.set(fieldName, fieldValue);
      db.patch(submission._id, { fields: submission.fields });
    }
  }
);
