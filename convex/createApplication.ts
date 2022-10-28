import { application } from "../src/components/form/exampleData";

import { mutation } from "./_generated/server";

export default mutation(async ({ db, auth }) => {
  const identity = await auth.getUserIdentity();
  if (!identity) {
    throw new Error("Called createApplication without authentication present");
  }

  // TODO: this is currently hard-coded to the example application data
  // eventually, we need a way to pass in the application data
  const { _id, _creationTime, ...exampleApplication } = application;

  db.insert("applications", exampleApplication);
});
