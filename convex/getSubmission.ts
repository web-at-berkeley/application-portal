import { getUser, isAdmin } from "./common";
import { Document, Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(
  async (
    { db, auth },
    applicationId: string,
    submissionID?: string,
    deleting?: boolean
  ): Promise<Document<"submissions"> | null> => {
    if (deleting) {
      return null;
    }

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

    if (submissionID) {
      if (
        !(await isAdmin(
          db,
          user._id,
          new Id<"applications">("applications", applicationId)
        ))
      ) {
        throw new Error("User is not an admin for this application!");
      }

      const submission: Document<"submissions"> | null = await db
        .query("submissions")
        .filter((q) =>
          q.and(
            q.eq(
              q.field("_id"),
              new Id<"submissions">("submissions", submissionID)
            ),
            q.eq(q.field("application"), application._id)
          )
        )
        .first();

      return submission;
    }

    const submission: Document<"submissions"> | null = await db
      .query("submissions")
      .filter((q) =>
        q.and(
          q.eq(q.field("user"), user._id),
          q.eq(q.field("application"), application._id)
        )
      )
      .first();

    return submission;
  }
);
