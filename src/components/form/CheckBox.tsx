import { Box, Text, Checkbox, CheckboxProps } from "@chakra-ui/react";

interface CheckBoxProps extends CheckboxProps {
  title: string;
  description: string;
}
export default function CheckBox({
  title,
  description,
  ...props
}: CheckBoxProps) {
  return (
    <div>
      <Box marginTop={0}>
        <Text variant="fieldTitle">{title}</Text>
        {description !== "" && (
          <Text marginTop={2} variant="fieldDescription">
            {description}
          </Text>
        )}
        <Checkbox marginTop={3.5} colorScheme="gray" size="lg" {...props} />
      </Box>
    </div>
  );
}
