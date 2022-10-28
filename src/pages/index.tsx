import { Box, Stack, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode, useState } from "react";

import { useMutation } from "../../convex/_generated/react";
import Application from "../components/application-form/Application";
import ButtonLink from "../components/utils/ButtonLink";
import NextLink from "../components/utils/NextLink";
import { Logout } from "../components/auth/Logout";

export default function Home() {
  const [child, setChild] = useState<object | null>(null);
  const createUser = useMutation("createUser");
  const createApplication = useMutation("createApplication");
  return (
    <>
      <Head>
        <title>TODO: page title</title>
      </Head>
      <Stack p={4}>
        <Logout />
        <Heading>WDB Next.js Template</Heading>
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
        <Box>
          <Application />
        </Box>
      </Stack>
    </>
  );
}
