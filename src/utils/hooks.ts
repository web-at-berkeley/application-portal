import { useQuery } from "../../convex/_generated/react";
import { Document } from "../../convex/_generated/dataModel";

import { createDefaultSubmission } from ".";

export function useSubmissionFields(application: Document<"applications">) {
  const submission = useQuery("getSubmission", application._id.toString());
  return (
    (submission && Object.fromEntries(submission.fields)) ??
    Object.fromEntries(createDefaultSubmission(application))
  );
}
