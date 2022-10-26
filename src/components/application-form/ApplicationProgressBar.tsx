import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  useTab,
  useMultiStyleConfig,
  Button,
  Box,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { forwardRef, ReactNode } from "react";

interface ApplicationProgressBarProps {
  stepNames: string[];
  currentStep: number;
  latestCompletedStep: number;
  tabPanels: string[];
  onChange: (step: number) => void;
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
  tabPanels,
  onChange,
}: ApplicationProgressBarProps) {
  const CustomTab = forwardRef<HTMLElement, CustomTabProps>((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const styles = useMultiStyleConfig("Tabs", tabProps);
    // @ts-expect-error - Chakra UI types are wrong
    styles.tab._selected.color = "rgb(95, 96, 346)";
    return (
      <Button __css={styles.tab} {...tabProps} width="100%">
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
    <>
      <Tabs
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
        </TabList>
        <br />
        <TabPanels scrollBehavior="smooth">
          {tabPanels.map((tabPanel, index) => (
            <TabPanel key={index}>
              <p>{tabPanel}</p>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
}

ApplicationProgressBar.displayName = "ApplicationProgressBar";
