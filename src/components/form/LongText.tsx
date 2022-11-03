import { Box, Text, Textarea, TextareaProps } from "@chakra-ui/react";

interface LongTextProps extends TextareaProps {
  name: string;
  title: string;
  description: string;
  wordLimit: number;
  value: string;
}

export default function LongText({
  name,
  title,
  description,
  wordLimit,
  value,
  ...props
}: LongTextProps) {
  return (
    <div>
      <Box marginTop={0}>
        <Text variant="fieldTitle">{title}</Text>
        {description !== "" && (
          <Text marginTop={2} variant="fieldDescription">
            {description}
          </Text>
        )}
        <Textarea
          marginTop={4}
          border="1px"
          borderRadius="5px"
          borderColor="#000000"
          _hover={{
            border: "1px",
            borderRadius: "5px",
            borderColor: "#00000",
          }}
          maxLength={wordLimit}
          name={name}
          value={value}
          {...props}
        />
        {/* Need to change it to no. of characters */}
      </Box>
    </div>
  );
}
