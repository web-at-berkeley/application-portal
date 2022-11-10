import { Box, Button, HStack } from "@chakra-ui/react";

interface ApplicationNavigationButtonsProps {
  currentStepUpdater: React.Dispatch<React.SetStateAction<number>>;
  lastCompletedStepUpdater: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  lastCompletedStep: number;
  numSteps: number;
}

export default function ApplicationNavigationButtons({
  currentStepUpdater,
  lastCompletedStepUpdater,
  currentStep,
  numSteps,
  lastCompletedStep,
}: ApplicationNavigationButtonsProps) {
  const handleBack = () => {
    currentStepUpdater((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentStep < numSteps) {
      currentStepUpdater((prev) => prev + 1);
      if (currentStep === lastCompletedStep) {
        lastCompletedStepUpdater((prev) => prev + 1);
      }
    }
  };

  return (
    <Box bg="white" p="1em" borderTop="1px solid lightgrey" w="100vw">
      <HStack>
        <Button
          bg="rgb(96, 96, 246)"
          color="white"
          minWidth={190}
          _hover={{ bg: "rgb(58, 58, 242)" }}
          fontWeight="normal"
          onClick={handleBack}
          visibility={currentStep === 0 ? "hidden" : "visible"}
        >
          Previous
        </Button>
        <Box w="full" />
        <Button
          bg="rgb(96, 96, 246)"
          position="relative"
          right={4}
          color="white"
          minWidth={190}
          _hover={{ bg: "rgb(58, 58, 242)" }}
          fontWeight="normal"
          onClick={handleNext}
        >
          {currentStep >= numSteps ? "Submit" : "Save & Continue"}
        </Button>
      </HStack>
    </Box>
  );
}
