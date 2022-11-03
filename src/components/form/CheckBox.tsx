import { Box, Text, Checkbox, CheckboxProps } from "@chakra-ui/react";

interface CheckBoxProps extends CheckboxProps {
  name: string;
  title: string;
  description: string;
  checked: boolean;
}
export default function CheckBox({
  name,
  title,
  description,
  checked,
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
        <Checkbox
          marginTop={3.5}
          colorScheme="gray"
          size="lg"
          name={name}
          defaultChecked={checked}
          checked={checked}
          {...props}
        />
      </Box>
    </div>
  );
}