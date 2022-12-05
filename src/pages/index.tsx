import { Heading, HStack, Stack, Flex, Spacer, Text } from "@chakra-ui/layout";

import { Logout } from "../components/auth/Logout";
import ButtonLink from "../components/utils/ButtonLink";
import Navbar from "../components/utils/NavBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Stack px={16} py={8}>
        <Flex>
          <Heading>WDB Application Portal</Heading>
          <Spacer />
          <Logout />
        </Flex>
        <Text fontSize="lg" pt={8}>
          Welcome to the WDB Application Portal, built with Convex! Use the
          buttons below to navigate the demo site:
        </Text>
        <HStack position="relative" top={12}>
          <ButtonLink
            href="/application/zrUQPf98OeGetO4sgrD18su"
            bg="rgb(96, 96, 246)"
            _hover={{ bg: "rgb(58, 58, 242)" }}
            color="white"
          >
            Application Page
          </ButtonLink>
          <ButtonLink
            href="/submissions/zrUQPf98OeGetO4sgrD18su"
            bg="rgb(96, 96, 246)"
            _hover={{ bg: "rgb(58, 58, 242)" }}
            color="white"
          >
            Admin Table Page
          </ButtonLink>
        </HStack>
      </Stack>
    </>
  );
}
