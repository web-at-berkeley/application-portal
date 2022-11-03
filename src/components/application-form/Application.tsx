import { Box } from "@chakra-ui/react";
import { useState } from "react";

import { useQuery } from "../../../convex/_generated/react";
import Navbar from "../utils/NavBar";

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
  if (!application || submission === undefined) {
    return <Box>loading...</Box>;
  }
  return (
    <Box w="100vw">
      <Navbar />
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
          currentStepUpdater={setCurrentStep}
          lastCompletedStepUpdater={setLatestCompletedStep}
          currentStep={currentStep}
          lastCompletedStep={latestCompletedStep}
          numSteps={application.steps.length}
        />
      </footer>
    </Box>
  );
}
