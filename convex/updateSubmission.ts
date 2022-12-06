import { createDefaultSubmission } from "../src/utils";

import { getUser } from "./common";
import { Document, Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

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

    const application: Document<"applications"> | null = await db.get(
      new Id<"applications">("applications", applicationId)
    );

    if (!application) {
      throw new Error("application does not exist");
    }

    // Check if we've already stored this submission before.
    const submission: Document<"submissions"> | null = await db
      .query("submissions")
      .withIndex("by_userAndApplication", (q) =>
        q.eq("user", user._id).eq("application", application._id)
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
