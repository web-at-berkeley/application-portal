import {
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { useMutation } from "../../convex/_generated/react";
import { Logout } from "../components/auth/Logout";
import Navbar from "../components/utils/NavBar";

export default function Home() {
  const createApplication = useMutation("createApplication");
  const [created, setCreated] = useState(false);
  const [id, setId] = useState("");

  async function seedData() {
    setCreated(true);
    const applicationId = await createApplication();
    setId(applicationId.toString());
  }

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
          To seed the applications table with an example application, click the
          button below. The ID of the application should then show up below so
          you can update index.tsx with the new ID.
        </Text>
        <HStack position="relative" top={12}>
          <Button
            onClick={seedData}
            bg="rgb(96, 96, 246)"
            _hover={{ bg: "rgb(58, 58, 242)" }}
            color="white"
            isDisabled={created}
          >
            Create Example Application
          </Button>
        </HStack>
        {id && (
          <Text fontSize="lg" pt={24}>
            The ID of the application is {id}
          </Text>
        )}
      </Stack>
    </>
  );
}
