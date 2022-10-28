import { Stack } from "@chakra-ui/react";

import { Document } from "../../../convex/_generated/dataModel";

import CheckBox from "./CheckBox";
import LongText from "./LongText";
import MultiChoice from "./MultiChoice";
import MultiSelect from "./MultiSelect";
import ShortText from "./ShortText";
import { application } from "./exampleData";

type Field = Document<"applications">["steps"][number]["fields"][number];

interface FormProps {
  step: string;
}

// TODO: add support for upload
export default function Form({ step }: FormProps) {
  const questions: Field[] = application.steps.filter((obj) => {
    return obj.name === step;
  })[0].fields;
  const form: JSX.Element[] = [];
  questions.forEach((field) => {
    switch (field.type) {
      case "shortText":
        form.push(
          <ShortText
            title={field.title}
            description={field.description}
            maxLen={field.maxLength}
          />
        );
        break;
      case "longText":
        form.push(
          <LongText
            title={field.title}
            description={field.description}
            wordLimit={field.wordLimit}
          />
        );
        break;
      case "multipleChoice":
        form.push(
          <MultiChoice
            title={field.title}
            description={field.description}
            options={field.options}
          />
        );
        break;
      case "multiSelect":
        form.push(
          <MultiSelect
            title={field.title}
            description={field.description}
            options={field.options}
          />
        );
        break;
      case "checkbox":
        form.push(
          <CheckBox title={field.title} description={field.description} />
        );
        break;
    }
  });
  return (
    <Stack spacing="30px" width="850px" margin="0 auto" padding="0 50px">
      {form}
    </Stack>
  );
}
