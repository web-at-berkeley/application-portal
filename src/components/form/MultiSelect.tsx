import {
  Box,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  Text,
  Stack,
} from "@chakra-ui/react";

interface MultiSelectProps extends CheckboxGroupProps {
  title: string;
  description: string;
  options: string[];
}
export default function MultiSelect({
  title,
  description,
  options,
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
          <CheckboxGroup colorScheme="gray" {...props}>
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
