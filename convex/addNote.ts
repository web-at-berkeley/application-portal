import { getUser, isAdmin } from "./common";
import { Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

export default mutation(
  async ({ db, auth }, submissionId: string, noteContents: string) => {
    const identity = await auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called addNote without authentication present");
    }

    const user = await getUser({ db, auth });
    if (user === null) {
      throw new Error("User does not exist in DB!");
    }

    const submission = await db
      .query("submissions")
      .filter((q) =>
        q.eq(q.field("_id"), new Id<"submissions">("submissions", submissionId))
      )
      .first();

    if (submission === null) {
      throw new Error("Submission does not exist in DB!");
    }

    const userIsAdmin = await isAdmin(db, user._id, submission.application);

    if (!userIsAdmin) {
      throw new Error("User not admin for application!");
    }

    return db.insert("notes", {
      submissionId,
      userId: user._id.toString(),
      noteContents,
    });
  }
);
