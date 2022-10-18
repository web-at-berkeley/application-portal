import { mutation } from "./_generated/server";

interface FormDataProps {
  text: string;
  checkbox: string[];
  multipleChoice: string;
}

export default mutation(async ({ db }, id: string, formdata: FormDataProps) => {
  const autosaveDoc = await db
    .query("autosave")
    .filter((q) => q.eq(q.field("id"), id))
    .first();
  if (autosaveDoc === null) {
    await db.insert("autosave", {
      id,
      formdata,
    });
    // console.log messages appear in your browser's console and the Convex dashboard.
  } else {
    autosaveDoc.formdata = formdata;
    await db.replace(autosaveDoc._id, autosaveDoc);
  }
});
