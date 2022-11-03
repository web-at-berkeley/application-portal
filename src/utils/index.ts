import { Document } from "../../convex/_generated/dataModel";

export function createDefaultSubmission(application: Document<"applications">) {
  return new Map<string, string | boolean | string[]>(
    Object.entries(
      application.steps.reduce(
        (fields, step) => ({
          ...fields,
          ...step.fields.reduce(
            (stepFields, field) => ({
              ...stepFields,
              ...{
                [field.name]:
                  field.type === "multiSelect"
                    ? []
                    : field.type === "checkbox"
                    ? false
                    : "",
              },
            }),
            {}
          ),
        }),
        {}
      )
    )
  );
}
