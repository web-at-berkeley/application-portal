import { ArrowBackIcon, DeleteIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { useQuery } from "../../../../convex/_generated/react";
import Form from "../../../components/form/Form";
import Summary from "../../../components/form/Summary";
import ButtonLink from "../../../components/utils/ButtonLink";
import Navbar from "../../../components/utils/NavBar";

interface ParamsProp {
  params: {
    appID: string;
    userID: string;
  };
}

export default function SingleApplicationPage({ params }: ParamsProp) {
  const application = useQuery("getApplication", params.appID);
  return (
    <>
      <Navbar />
      {application ? (
        <Flex direction="column">
          <Box marginLeft="25px" marginTop="1vw">
            <ButtonLink href="/" variant="grey">
              <ArrowBackIcon />
            </ButtonLink>
          </Box>
          <Box marginLeft="3vw" marginTop="5px">
            <Flex direction="row">
              <Box paddingTop="5px">
                <Text fontWeight="bold" fontSize="x-large">
                  Applicant Info
                </Text>
              </Box>
              <HStack ml="calc(100% - 500px)">
                <ButtonLink
                  bg="#F3F2FF"
                  href="/"
                  variant="grey"
                  marginRight="1vw"
                >
                  <Flex direction="row">
                    <EmailIcon />
                    <Text marginLeft="10px" fontWeight="bold">
                      Email
                    </Text>
                  </Flex>
                </ButtonLink>
                <ButtonLink bg="#F3F2FF" href="/" variant="grey">
                  <Flex direction="row">
                    <DeleteIcon />
                    <Text marginLeft="10px" fontWeight="bold">
                      Remove
                    </Text>
                  </Flex>
                </ButtonLink>
              </HStack>
            </Flex>
          </Box>
          <Box marginLeft="3vw" marginTop="1vw" marginEnd="50vw">
            <Tabs>
              <TabList>
                <Tab>Application Progress</Tab>
                <Tab>Admin Fields</Tab>
                <Tab>Submission</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {/* TODO: application progress */}
                  <Center mt={12}>
                    <Spinner size="xl" color="convex.lightBlue" />
                  </Center>
                </TabPanel>
                <TabPanel>
                  <Box ml={-12} mt={2} mr={0} w="110%">
                    <Form
                      step=""
                      id={params.appID}
                      userID={params.userID}
                      isDisabled={false}
                    />
                  </Box>
                </TabPanel>
                <TabPanel ml={-8} my={4}>
                  <Summary
                    stepNames={application.steps.map((step) => step.name)}
                    id={params.appID}
                    userID={params.userID}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      ) : (
        <Center mt="40vh">
          <Spinner size="xl" color="convex.lightBlue" />
        </Center>
      )}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: ParamsProp) {
  return {
    props: {
      params,
    },
  };
}
