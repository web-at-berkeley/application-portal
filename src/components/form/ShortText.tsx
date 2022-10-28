import { Box, Input, Text, TextProps } from "@chakra-ui/react";

interface ShortTextProps extends TextProps {
  title: string;
  description: string;
  maxLen: number;
}

export default function ShortText({
  title,
  description,
  maxLen,
  ...props
}: ShortTextProps) {
  return (
    <div>
      <Box marginTop={0} width="100%">
        <Text variant="fieldTitle">{title}</Text>
        {description !== "" && (
          <Text marginTop={2} variant="fieldDescription">
            {description}
          </Text>
        )}
        <Input
          marginTop={4}
          border="1px"
          borderRadius="5px"
          borderColor="#000000"
          _hover={{
            border: "1px",
            borderRadius: "5px",
            borderColor: "#00000",
          }}
          maxLength={maxLen}
          {...props}
        />
      </Box>
    </div>
  );
}
