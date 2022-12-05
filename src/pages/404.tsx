import { Center, Text, VStack } from "@chakra-ui/react";

import ButtonLink from "../components/utils/ButtonLink";
import Navbar from "../components/utils/NavBar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <Center mt={20}>
        <VStack>
          <Text fontSize="48px" as="b">
            Uh oh...
          </Text>
          <Text fontSize="15px">
            {" "}
            This page doesn&apos;t exist! Return to safety with the button
            below.
          </Text>
          <br />
          <ButtonLink
            href="/"
            bg="rgb(96, 96, 246)"
            color="white"
            _hover={{ bg: "rgb(58, 58, 242)" }}
            fontWeight="normal"
          >
            Go Back Home
          </ButtonLink>
        </VStack>
      </Center>
    </>
  );
}
