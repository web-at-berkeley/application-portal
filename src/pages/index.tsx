import { Box, Heading, HStack, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode, useState } from "react";

import { useMutation } from "../../convex/_generated/react";
import { Logout } from "../components/auth/Logout";
import ButtonLink from "../components/utils/ButtonLink";
import Navbar from "../components/utils/NavBar";
import NextLink from "../components/utils/NextLink";

export default function Home() {
  const [child, setChild] = useState<object | null>(null);
  const createUser = useMutation("createUser");
  const createApplication = useMutation("createApplication");
  return (
    <>
      <Navbar />
      <Head>
        <title>WDB Application Portal</title>
      </Head>
      <Stack p={4}>
        <Heading>WDB Application Portal</Heading>
        <Logout />
        <Box>
          <Button variant="blue" onClick={() => setChild({})}>
            {(child as ReactNode) ?? "Test error handling"}
          </Button>
        </Box>
        <Box>
          <ButtonLink href="/test" variant="blue">
            Test Navigation
          </ButtonLink>
        </Box>
        <Box>
          <ButtonLink href="/application" variant="blue">
            Test Components
          </ButtonLink>
        </Box>
        <Box>
          <NextLink href="/random-route" color="TODO.blue">
            Test 404 Page
          </NextLink>
        </Box>
        <Box>
          <Button onClick={() => createUser()}>Create User (test)</Button>
        </Box>
        <Box>
          <Button onClick={() => createApplication()}>
            Create Application (test)
          </Button>
        </Box>
        <HStack position="relative" top={12}>
          <ButtonLink
            href="/application/zrUQPf98OeGetO4sgrD18su"
            variant="blue"
          >
            Application Page
          </ButtonLink>
          <ButtonLink
            href="/submissions/zrUQPf98OeGetO4sgrD18su"
            variant="blue"
          >
            Admin Table Page
          </ButtonLink>
          <ButtonLink
            href="/singleApp/zrUQPf98OeGetO4sgrD18su/BSMWqstYIimcNgs7w2f4sfw"
            variant="blue"
          >
            Single Applicant View
          </ButtonLink>
        </HStack>
      </Stack>
    </>
  );
}
