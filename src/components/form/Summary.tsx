import { Box, HStack, Text } from "@chakra-ui/react";

import Form from "./Form";

interface SummaryProps {
  stepNames: string[];
  id: string;
}
export default function Summary({ stepNames, id }: SummaryProps) {
  return (
    <>
      {stepNames.map((stepName, index) => (
        <>
          <HStack
            key={index}
            width="850px"
            margin="0 auto"
            padding="0 50px"
            marginBottom="25px"
            marginTop={index === 0 ? "0px" : "75px"}
          >
            <Box
              bgColor="#5F60FF"
              borderRadius="50%"
              height="50px"
              width="50px"
              marginRight="7px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text fontSize="20px" fontWeight="400" color="#ffffff">
                {index + 1 < 10
                  ? "0" + (index + 1).toString()
                  : (index + 1).toString()}
              </Text>
            </Box>
            <Text fontWeight="500" fontSize="28px" marginLeft="0px">
              {stepName}
            </Text>
          </HStack>
          <Form step={stepName} id={id} isDisabled />
        </>
      ))}
    </>
  );
}
