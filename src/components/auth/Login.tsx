import { useAuth0 } from "@auth0/auth0-react";
import { Center, Spinner } from "@chakra-ui/react";

export function Login() {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return (
    <Center mt="50vh">
      <Spinner color="convex.lightBlue" />
    </Center>
  );
}
