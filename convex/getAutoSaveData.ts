import { query } from "./_generated/server";

export default query(async ({ db }, id: string) => {
  const autosaveDoc = await db
    .query("autosave")
    .filter((q) => q.eq(q.field("id"), id))
    .first();
  return autosaveDoc?.formdata;
});
