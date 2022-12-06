import { Flex, Heading, HStack, Spacer, Stack, Text } from "@chakra-ui/layout";

import { Logout } from "../components/auth/Logout";
import ButtonLink from "../components/utils/ButtonLink";
import Navbar from "../components/utils/NavBar";

const DEMO_APPLICATION_ID = "zrUQPf98OeGetO4sgrD18su";

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
          Welcome to the WDB (Web Development at Berkeley) Application Portal,
          built with Convex!
          <br /> <br />
          This is a demo version of the app, so you&apos;re an automatically
          added as an admin for all applications just by logging in (although
          you would normally enable the proper security logic for a production
          version of the application).
          <br /> <br />
          All data within the app is synced in real-time thanks to Convex,
          meaning the application form is automatically saved when you edit, and
          multiple admins can view and edit the same submission at the same
          time!
          <br /> <br />
          To submit an application, click the button on the left. To view the
          list of all application submissions and view details about a
          particular user&apos;s submission, click the button on the right.
        </Text>
        <HStack position="relative" top={12}>
          <ButtonLink
            href={`/application/${DEMO_APPLICATION_ID}`}
            bg="rgb(96, 96, 246)"
            _hover={{ bg: "rgb(58, 58, 242)" }}
            color="white"
          >
            Application Page
          </ButtonLink>
          <ButtonLink
            href={`/submissions/${DEMO_APPLICATION_ID}`}
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
