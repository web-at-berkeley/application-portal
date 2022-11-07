import { Box, Input, Text, TextProps } from "@chakra-ui/react";

interface ShortTextProps extends TextProps {
  name: string;
  title: string;
  description: string;
  maxLen: number;
  value: string;
  isDisabled: boolean;
}

export default function ShortText({
  name,
  title,
  description,
  maxLen,
  value,
  isDisabled,
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
          isDisabled={isDisabled}
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
          defaultValue={value}
          name={name}
          value={value}
          {...props}
        />
      </Box>
    </div>
  );
}
