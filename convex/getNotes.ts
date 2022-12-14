import { getUser, isAdmin } from "./common";
import { Document, Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

export default query(
  async ({ db, auth }, submissionId: string, deleting?: boolean) => {
    if (deleting) {
      return null;
    }

    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called getNotes without authentication present");
    }

    const user = await getUser({ db, auth });
    if (user === null) {
      throw new Error("User does not exist in DB!");
    }

    const submission = await db.get(
      new Id<"submissions">("submissions", submissionId)
    );

    if (submission === null) {
      throw new Error("Submission does not exist in DB!");
    }

    const userIsAdmin = await isAdmin(db, user._id, submission.application);

    if (!userIsAdmin) {
      throw new Error("User not admin for application!");
    }

    const notes: Document<"notes">[] = await db
      .query("notes")
      .withIndex("by_submissionId", (q) => q.eq("submissionId", submissionId))
      .order("desc")
      .collect();
    return Promise.all(
      notes.map(async ({ userId, ...note }) => ({
        ...note,
        user: (await db.get(submission.user))!,
      }))
    );
  }
);
