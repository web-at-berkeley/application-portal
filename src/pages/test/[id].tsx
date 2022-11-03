import {
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  CheckboxGroup,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

import { useQuery, useMutation } from "../../../convex/_generated/react";

interface ParamsProp {
  params: {
    id: string;
  };
}

export default function Test({ params }: ParamsProp) {
  const formData = useQuery("getAutoSaveData", params.id) ?? {
    text: "",
    checkbox: [] as string[],
    multipleChoice: "",
  };

  const uploadAutoSaveData = useMutation("autoSaveData").withOptimisticUpdate(
    (localStore, id, data) => {
      const currentValue = localStore.getQuery("getAutoSaveData", [id]);
      if (currentValue !== undefined) {
        localStore.setQuery("getAutoSaveData", [id], data);
      }
    }
  );

  const handleAutoSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formDataCopy = { ...formData };
    switch (e.target.classList[0]) {
      case "chakra-input":
        formDataCopy.text = e.target.value;
        break;
      case "chakra-radio__input":
        formDataCopy.multipleChoice = e.target.value;
        break;
      case "chakra-checkbox__input":
        if (e.target.checked) {
          if (formData.checkbox === undefined || formData.checkbox === null) {
            formDataCopy.checkbox = [e.target.value];
          } else {
            formDataCopy.checkbox.push(e.target.value);
          }
        } else {
          // Removes the current value from the list
          formDataCopy.checkbox.splice(
            formData.checkbox.indexOf(e.target.value),
            1
          );
        }
        break;
      default:
    }
    uploadAutoSaveData(params.id, formDataCopy);
  };

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      marginY="3rem"
      marginX={{ base: "0vw", md: "25vw" }}
      padding=".5rem"
      width={{ base: "100vw", md: "50vw" }}
      border="1px solid black"
    >
      <Text>Application Form : {params.id}</Text>
      <FormControl isRequired onChange={handleAutoSave}>
        <FormLabel>Text Box</FormLabel>
        <Input defaultValue={formData.text} value={formData.text} />
        <FormLabel>Check Box</FormLabel>
        <CheckboxGroup colorScheme="green" value={formData.checkbox}>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            <Checkbox value="will">Will</Checkbox>
            <Checkbox value="anish">Anish</Checkbox>
            <Checkbox value="sanjeev">Sanjeev</Checkbox>
          </Stack>
        </CheckboxGroup>
        <FormLabel>Multiple Choice</FormLabel>
        <RadioGroup value={formData.multipleChoice}>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            <Radio value="will">Will</Radio>
            <Radio value="anish">Anish</Radio>
            <Radio value="sanjeev">Sanjeev</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
    </Flex>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: ParamsProp) {
  return {
    props: {
      params,
    },
  };
}
