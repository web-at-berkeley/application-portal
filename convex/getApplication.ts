import { GenericId } from "convex/values";

import { Document } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(
  async (
    { db, auth },
    applicationId: string
  ): Promise<Document<"applications"> | null> => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called getApplication without authentication present");
    }

    return await db
      .query("applications")
      .filter((q) =>
        q.eq(
          q.field("_id"),
          new GenericId<"applications">("applications", applicationId)
        )
      )
      .first();
  }
);
