import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  HStack,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMultiStyleConfig,
  useTab,
  VStack,
} from "@chakra-ui/react";
import { forwardRef, ReactNode } from "react";

import Form from "../form/Form";
import Summary from "../form/Summary";

interface ApplicationProgressBarProps {
  stepNames: string[];
  currentStep: number;
  latestCompletedStep: number;
  onChange: (step: number) => void;
  id: string;
}

interface CustomTabProps {
  children: ReactNode;
  isDisabled: boolean;
  isCurrentStep: boolean;
  step: number;
  key: number;
}

export default function ApplicationProgressBar({
  stepNames,
  currentStep,
  latestCompletedStep,
  onChange,
  id,
}: ApplicationProgressBarProps) {
  const CustomTab = forwardRef<HTMLElement, CustomTabProps>((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const styles = useMultiStyleConfig("Tabs", tabProps);
    // @ts-expect-error - Chakra UI types are wrong
    styles.tab._selected.color = "rgb(95, 96, 346)";
    return (
      <Button __css={styles.tab} {...tabProps} width="100%" pt={6}>
        <VStack align="left">
          <HStack>
            <Box>{(props.step + 1).toString().padStart(2, "0")}</Box>
            <Box>{tabProps.children}</Box>
          </HStack>
          <HStack>
            <Box>
              {latestCompletedStep === props.step ? (
                <CheckCircleIcon color="rgb(210, 210, 210)" boxSize={6} />
              ) : latestCompletedStep > props.step ? (
                <CheckCircleIcon color="rgb(95, 96, 346)" boxSize={6} />
              ) : (
                <CheckCircleIcon color="rgb(75, 75, 75)" boxSize={6} />
              )}
            </Box>
            <Box
              color="rgb(152, 185, 123)"
              height={1}
              borderRadius={2}
              w="100%"
              bg={
                latestCompletedStep === props.step
                  ? "rgb(210, 210, 210)"
                  : latestCompletedStep > props.step
                  ? "rgb(95, 96, 346)"
                  : "rgb(75, 75, 75)"
              }
            />
          </HStack>
        </VStack>
      </Button>
    );
  });

  CustomTab.displayName = "CustomTab";

  return (
    <Center>
      <Tabs
        w="90vw"
        index={currentStep}
        defaultIndex={currentStep}
        variant="unstyled"
        outline="none"
        onChange={onChange}
      >
        <TabList>
          {stepNames.map((stepName, index) => (
            <CustomTab
              key={index}
              isDisabled={index > latestCompletedStep}
              isCurrentStep={index === currentStep}
              step={index}
            >
              {stepName}
            </CustomTab>
          ))}
          <CustomTab
            key={stepNames.length}
            isDisabled={stepNames.length > latestCompletedStep}
            isCurrentStep={stepNames.length === currentStep}
            step={stepNames.length}
          >
            Review & Submit
          </CustomTab>
        </TabList>
        <br />
        <TabPanels scrollBehavior="smooth" marginBottom="100px">
          {stepNames.map((stepName, index) => (
            <TabPanel key={index}>
              <Form id={id} step={stepName} isDisabled={false} />
            </TabPanel>
          ))}
          <TabPanel>
            <Summary stepNames={stepNames} id={id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
}

ApplicationProgressBar.displayName = "ApplicationProgressBar";
