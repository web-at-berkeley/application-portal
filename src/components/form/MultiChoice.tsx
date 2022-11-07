import { Select, SelectProps, Text, Box } from "@chakra-ui/react";

interface MultiChoiceProps extends SelectProps {
  name: string;
  title: string;
  description: string;
  options: string[];
  value: string;
  isDisabled: boolean;
}
export default function MultiChoice({
  name,
  title,
  description,
  options,
  value,
  isDisabled,
  ...props
}: MultiChoiceProps) {
  return (
    <div>
      <Box marginTop={0}>
        <Text variant="fieldTitle">{title}</Text>
        {description !== "" && (
          <Text marginTop={2} variant="fieldDescription">
            {description}
          </Text>
        )}
        <Select
          isDisabled={isDisabled}
          marginTop={4}
          placeholder="Select Option"
          border="1px"
          borderRadius="5px"
          borderColor="#000000"
          _hover={{
            border: "1px",
            borderRadius: "5px",
            borderColor: "#00000",
          }}
          name={name}
          value={value}
          {...props}
        >
          {options.map((option, i) => {
            return (
              <option value={option} key={i}>
                {option}
              </option>
            );
          })}
        </Select>
      </Box>
    </div>
  );
}
