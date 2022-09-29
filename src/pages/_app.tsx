import { AppProps } from "next/app";
import {
  ChakraProvider,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  Center,
} from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";
import { ErrorBoundary } from "react-error-boundary";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";

import convexConfig from "../../convex.json";
import clientConfig from "../../convex/_generated/clientConfig";
import { theme } from "../utils/theme";

const convex = new ConvexReactClient(clientConfig);
const authInfo = convexConfig.authInfo[0];

export default function WeeklyApp({ Component, pageProps }: AppProps) {
  const { onClose } = useDisclosure();
  return (
    <ConvexProviderWithAuth0 client={convex} authInfo={authInfo}>
      <ChakraProvider theme={theme}>
        <ErrorBoundary
          FallbackComponent={() => (
            <Modal isOpen onClose={onClose} isCentered preserveScrollBarGap>
              <ModalOverlay />
              <ModalContent maxW={{ base: "90%", sm: "450px" }}>
                <ModalHeader>Unknown Error</ModalHeader>
                <ModalBody>
                  <Center>
                    <WarningTwoIcon boxSize={16} color="red.500" />
                  </Center>
                </ModalBody>
                <ModalFooter>
                  Unfortunately, an unexpected error has occurred. Please reload
                  the page to try again.
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
          onError={console.error}
        >
          <NextNProgress height={5} />
          <Component {...pageProps} />
        </ErrorBoundary>
      </ChakraProvider>
    </ConvexProviderWithAuth0>
  );
}
