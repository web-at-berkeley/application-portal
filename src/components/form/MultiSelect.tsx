import {
  Box,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  Text,
  Stack,
} from "@chakra-ui/react";

interface MultiSelectProps extends CheckboxGroupProps {
  name: string;
  title: string;
  description: string;
  options: string[];
  value: string[];
}
export default function MultiSelect({
  name,
  title,
  description,
  options,
  value,
  ...props
}: MultiSelectProps) {
  return (
    <div>
      <Box marginTop={0}>
        <Text variant="fieldTitle">{title}</Text>
        {description !== "" && (
          <Text marginTop={2} variant="fieldDescription">
            {description}
          </Text>
        )}
        <Box marginTop={2.5}>
          <CheckboxGroup
            colorScheme="gray"
            {...props}
            // TODO: fix checkbox groups
            // @ts-expect-error
            name={name}
            value={value}
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {options.map((option, i) => {
                return (
                  <Checkbox size="lg" value={option} key={i}>
                    {option}
                  </Checkbox>
                );
              })}
            </Stack>
          </CheckboxGroup>
        </Box>
      </Box>
    </div>
  );
}
