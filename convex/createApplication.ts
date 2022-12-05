import { exampleApplication } from "../src/components/form/exampleData";

import { getUser } from "./common";
import { mutation } from "./_generated/server";

export default mutation(async ({ db, auth }) => {
  const user = await getUser({ db, auth });
  if (!user) {
    throw new Error("User is not in the database!");
  }

  // This is currently using example application data but can be
  // changed to use data from other sources, like a form builder.
  const applicationId = await db.insert("applications", exampleApplication);

  db.insert("admins", {
    userId: user._id,
    application: applicationId,
  });
});
