import { Box, Center, Spinner, Text, VStack, Image } from "@chakra-ui/react";
import { useState } from "react";

import { useQuery } from "../../../convex/_generated/react";
import Navbar from "../utils/NavBar";
import ButtonLink from "../utils/ButtonLink";

import ApplicationNavigationButtons from "./ApplicationNavigationButtons";
import ApplicationProgressBar from "./ApplicationProgressBar";

interface ApplicationProps {
  id: string;
}

export default function Application({ id }: ApplicationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [latestCompletedStep, setLatestCompletedStep] = useState(0);
  const application = useQuery("getApplication", id);
  const submission = useQuery("getSubmission", id);
  if (!submission?.submitted) {
    return (
      <Box w="100vw">
        <Navbar />
        {!application || submission === undefined ? (
          <Center mt="40vh">
            <Spinner size="xl" color="convex.lightBlue" />
          </Center>
        ) : (
          <>
            <ApplicationProgressBar
              stepNames={application.steps.map((step) => step.name)}
              currentStep={currentStep}
              onChange={setCurrentStep}
              latestCompletedStep={latestCompletedStep}
              id={id}
            />
            <footer
              style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                paddingRight: "16px",
                width: "100%",
              }}
            >
              <ApplicationNavigationButtons
                id={id}
                currentStepUpdater={setCurrentStep}
                lastCompletedStepUpdater={setLatestCompletedStep}
                currentStep={currentStep}
                lastCompletedStep={latestCompletedStep}
                numSteps={application.steps.length}
              />
            </footer>
          </>
        )}
      </Box>
    );
  } else {
    return (
      <Box w="100vw">
        <Navbar />
        {!application || submission === undefined ? (
          <Center mt="40vh">
            <Spinner size="xl" color="convex.lightBlue" />
          </Center>
        ) : (
          <>
            <Center mt={20}>
              <VStack>
                <Image
                  src="/images/submitted.png"
                  alt="Submitted"
                  boxSize={32}
                />
                <Text fontSize="25px" as="b">
                  CONGRATS!
                </Text>
                <Text fontSize="25px" as="b">
                  YOUR APPLICATION HAS BEEN SUBMITTED.
                </Text>
                <Text fontSize="15px">
                  Check out your Application Portal to see any details and
                  actions that you are required to do.
                </Text>
                <Text fontSize="15px">
                  We will notify any updates through email.
                </Text>
                <br />
                <ButtonLink
                  href="/"
                  bg="rgb(96, 96, 246)"
                  color="white"
                  _hover={{ bg: "rgb(58, 58, 242)" }}
                  fontWeight="normal"
                >
                  Go to Application Portal
                </ButtonLink>
              </VStack>
            </Center>
          </>
        )}
      </Box>
    );
  }
}
