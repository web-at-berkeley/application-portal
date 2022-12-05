import { Document } from "../../convex/_generated/dataModel";
import { useQuery } from "../../convex/_generated/react";

import { createDefaultSubmission } from ".";

export function useSubmissionFields(
  application: Document<"applications">,
  submissionId?: string
) {
  let submission;
  if (submissionId) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    submission = useQuery(
      "getSubmission",
      application._id.toString(),
      submissionId
    );
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    submission = useQuery("getSubmission", application._id.toString());
  }
  return (
    (submission && Object.fromEntries(submission.fields)) ??
    Object.fromEntries(createDefaultSubmission(application))
  );
}
