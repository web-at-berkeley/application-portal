import { FormControl, Stack } from "@chakra-ui/react";

import { Document } from "../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "../../../convex/_generated/react";
import { useSubmissionFields } from "../../utils/hooks";

import CheckBox from "./CheckBox";
import LongText from "./LongText";
import MultiChoice from "./MultiChoice";
import MultiSelect from "./MultiSelect";
import ShortText from "./ShortText";

type ApplicationField =
  Document<"applications">["steps"][number]["fields"][number];
type AdminField = Document<"applications">["adminFields"][number];
type Field = ApplicationField | AdminField;

interface FormProps {
  step: string;
  id: string;
  isDisabled: boolean;
  userID?: string;
}

// TODO: add support for upload
export default function Form({ step, id, isDisabled, userID }: FormProps) {
  const application = useQuery("getApplication", id)!;
  let questions: Field[];
  const isAdminFields = !isDisabled && userID !== undefined;
  if (isAdminFields) {
    questions = application.adminFields;
  } else {
    questions = application.steps.filter((obj) => {
      return obj.name === step;
    })[0].fields;
  }

  const fields = useSubmissionFields(application, userID);
  const uploadAutoSaveData = useMutation(
    "updateSubmission"
  ).withOptimisticUpdate((localStore, id, fieldName, fieldValue) => {
    const currentValue = localStore.getQuery(
      "getSubmission",
      userID ? [id, userID] : [id]
    );
    if (currentValue) {
      const newCurrentValue = { ...currentValue };
      newCurrentValue.fields.set(fieldName, fieldValue);
      localStore.setQuery(
        "getSubmission",
        userID ? [id, userID] : [id],
        newCurrentValue
      );
    }
  });

  const handleAutoSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadAutoSaveData(
      id,
      e.target.name,
      e.target.type === "checkbox" ? e.target.checked : e.target.value
    );
  };

  const form: JSX.Element[] = [];
  questions.forEach((field) => {
    const title = isAdminFields
      ? field.name
      : (field as ApplicationField).title;
    const description = isAdminFields
      ? ""
      : (field as ApplicationField).description;
    switch (field.type) {
      case "shortText":
        form.push(
          <ShortText
            key={field.name}
            name={field.name}
            title={title}
            description={description}
            maxLen={field.maxLength}
            value={fields[field.name] as string}
            isDisabled={isDisabled}
          />
        );
        break;
      case "longText":
        form.push(
          <LongText
            key={field.name}
            name={field.name}
            title={title}
            description={description}
            wordLimit={field.wordLimit}
            value={fields[field.name] as string}
            isDisabled={isDisabled}
          />
        );
        break;
      case "multipleChoice":
        form.push(
          <MultiChoice
            key={field.name}
            name={field.name}
            title={title}
            description={description}
            options={field.options}
            value={fields[field.name] as string}
            isDisabled={isDisabled}
          />
        );
        break;
      case "multiSelect":
        form.push(
          <MultiSelect
            key={field.name}
            name={field.name}
            title={title}
            description={description}
            options={field.options}
            value={fields[field.name] as string[]}
            isDisabled={isDisabled}
          />
        );
        break;
      case "checkbox":
        form.push(
          <CheckBox
            key={field.name}
            name={field.name}
            title={title}
            description={description}
            checked={fields[field.name] as boolean}
            isDisabled={isDisabled}
          />
        );
        break;
    }
  });
  return (
    <FormControl onChange={handleAutoSave}>
      <Stack
        spacing="30px"
        width={userID ? "100%" : "850px"}
        margin="0 auto"
        padding="0 50px"
      >
        {form}
      </Stack>
    </FormControl>
  );
}
