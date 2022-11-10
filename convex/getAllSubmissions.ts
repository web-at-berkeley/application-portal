import { GenericId } from "convex/values";

import { Document } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(
  async (
    { db, auth },
    applicationId: string,
    // Optional parameters
    argumentsModifiers?: {
      sorting?: {
        order: string;
        field: string;
      };
      filters?: {
        name: string;
        value: string | boolean | string[];
      }[];
      fieldsToInclude?: string[];
    }
  ) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error(
        "Called getAllSubmissions without authentication present"
      );
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
    // TODO filter validation
    const submissions: Document<"submissions">[] = (
      await db.query("submissions").collect()
    ).filter(
      (submission) =>
        !argumentsModifiers?.filters ||
        argumentsModifiers.filters.every(
          (filter) => submission.fields.get(filter.name) === filter.value
        )
    );

    // .map((s) => {});
    // .sort(() => ())

    return submissions;
  }
);
