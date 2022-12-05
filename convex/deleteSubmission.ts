import { Document, Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";
import { getUser, isAdmin } from "./common";

export default mutation(async ({ db, auth }, submissionId: string) => {
  const user: Document<"users"> | null = await getUser({ db, auth });

  if (!user) {
    throw new Error("User is not in the database!");
  }

  const submission: Document<"submissions"> | null = await db.get(
    new Id<"submissions">("submissions", submissionId)
  );

  if (submission === null) {
    throw new Error("Submission does not exist");
  }

  const userIsAdmin = await isAdmin(db, user._id, submission.application);

  if (!userIsAdmin) {
    throw new Error("User not admin for application!");
  }

  // Delete associated notes
  const notes = await db
    .query("notes")
    .filter((q) => q.eq(q.field("submissionId"), submissionId))
    .collect();

  await Promise.all(notes.map((note) => db.delete(note._id)));

  await db.delete(submission._id);
});
