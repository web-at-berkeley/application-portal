import { Document } from "../../convex/_generated/dataModel";

function createDefaultFields(fields: { name: string; type: string }[]) {
  return fields.reduce(
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
  );
}

export function createDefaultSubmission(application: Document<"applications">) {
  return new Map<string, string | boolean | string[]>(
    Object.entries({
      ...application.steps.reduce(
        (fields, step) => ({
          ...fields,
          ...createDefaultFields(step.fields),
        }),
        {}
      ),
      ...createDefaultFields(application.adminFields),
    })
  );
}
