import { useAuth0 } from "@auth0/auth0-react";
import { Box, Text, Button } from "@chakra-ui/react";

export function Logout() {
  const { logout, user } = useAuth0();
  return (
    <Box>
      {/* This component only renders if the user is logged in. */}
      <Text>Logged in{user!.name ? ` as ${user!.name}` : ""}</Text>
      <Button onClick={() => logout({ returnTo: window.location.origin })}>
        Log out
      </Button>
    </Box>
  );
}
