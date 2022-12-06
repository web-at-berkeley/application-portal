import { Document, Id } from "./_generated/dataModel";
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

    return await db.get(new Id<"applications">("applications", applicationId));
  }
);
