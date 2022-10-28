import { Select, SelectProps, Text, Box } from "@chakra-ui/react";

interface MultiChoiceProps extends SelectProps {
  title: string;
  description: string;
  options: string[];
}
export default function MultiChoice({
  title,
  description,
  options,
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
