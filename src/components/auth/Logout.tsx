import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@chakra-ui/react";

export function Logout() {
  const { logout } = useAuth0();
  return (
    <Box>
      {/* This component only renders if the user is logged in. */}
      <Button onClick={() => logout({ returnTo: window.location.origin })}>
        Log out
      </Button>
    </Box>
  );
}
