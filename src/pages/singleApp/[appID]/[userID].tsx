import { ArrowBackIcon, DeleteIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

import { useQuery } from "../../../../convex/_generated/react";
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
                  Applicant Name
                </Text>
              </Box>
              <Box marginStart="63vw">
                <ButtonLink
                  bg="purple.100"
                  href="/"
                  variant="grey"
                  marginRight="2vw"
                >
                  <Flex direction="row">
                    <EmailIcon />
                    <Text marginLeft="10px" fontWeight="bold">
                      Email
                    </Text>
                  </Flex>
                </ButtonLink>
                <ButtonLink bg="purple.100" href="/" variant="grey">
                  <Flex direction="row">
                    <DeleteIcon />
                    <Text marginLeft="10px" fontWeight="bold">
                      Remove
                    </Text>
                  </Flex>
                </ButtonLink>
              </Box>
            </Flex>
          </Box>
          <Box marginLeft="3vw" marginTop="1vw" marginEnd="50vw">
            <Tabs>
              <TabList>
                <Tab>Application Progress</Tab>
                <Tab>Admin Field</Tab>
                <Tab>Submission</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <p>view one tbd</p>
                </TabPanel>
                <TabPanel>
                  <p>view two tbd</p>
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
