import { Document } from "../../convex/_generated/dataModel";
import { useQuery } from "../../convex/_generated/react";

import { createDefaultSubmission } from ".";

export function useSubmissionFields(
  application: Document<"applications">,
  userID?: string
) {
  let submission;
  if (userID) {
    // TODO: figure out how to do this while following hook rules
    // eslint-disable-next-line react-hooks/rules-of-hooks
    submission = useQuery("getSubmission", application._id.toString(), userID);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    submission = useQuery("getSubmission", application._id.toString());
  }
  return (
    (submission && Object.fromEntries(submission.fields)) ??
    Object.fromEntries(createDefaultSubmission(application))
  );
}
