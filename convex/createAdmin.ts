import { getUser, isAdmin } from "./common";
import { Document, Id } from "./_generated/dataModel";
import { mutation } from "./_generated/server";

export default mutation(
  async ({ db, auth }, applicationId: string, userId: string) => {
    const user: Document<"users"> | null = await getUser({ db, auth });
    if (!user) {
      throw new Error("User is not in the database!");
    }

    const application: Document<"applications"> | null = await db.get(
      new Id<"applications">("applications", applicationId)
    );

    if (!application) {
      throw new Error("Application does not exist");
    }

    if (!(await isAdmin(db, user._id, application._id))) {
      throw new Error("User is not an admin for this application!");
    }

    db.insert("admins", {
      userId: new Id<"users">("users", userId),
      application: application._id,
    });
  }
);
