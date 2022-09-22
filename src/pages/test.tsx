import { Box } from "@chakra-ui/react";

import ButtonLink from "../components/utils/ButtonLink";

export default function Test() {
  return (
    <Box p={4}>
      <Box>Temporary test page</Box>
      <ButtonLink href="/" variant="blue">
        Go Back Home
      </ButtonLink>
    </Box>
  );
}
