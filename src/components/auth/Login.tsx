import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Heading } from "@chakra-ui/react";

export function Login() {
  const { isLoading, loginWithRedirect } = useAuth0();
  if (isLoading) {
    return <button className="btn btn-primary">Loading...</button>;
  }
  // TODO: this is a placeholder
  return (
    <Box p={5}>
      <Heading>Custom Login Text Here</Heading>
      <Box>
        <Button onClick={loginWithRedirect}>Log in</Button>
      </Box>
    </Box>
  );
}
