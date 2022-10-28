import { Box, Text, Textarea, TextareaProps } from "@chakra-ui/react";

interface LongTextProps extends TextareaProps {
  title: string;
  description: string;
  wordLimit: number;
}

export default function LongText({
  title,
  description,
  wordLimit,
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
          {...props}
        />
        {/* Need to change it to no. of characters */}
      </Box>
    </div>
  );
}
