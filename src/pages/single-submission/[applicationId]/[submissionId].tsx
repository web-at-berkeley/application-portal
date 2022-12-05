import { ArrowBackIcon, DeleteIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  HStack,
  Button,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { useMutation, useQuery } from "../../../../convex/_generated/react";
import Form from "../../../components/form/Form";
import Summary from "../../../components/form/Summary";
import NoteView from "../../../components/single-submission/NoteView";
import ButtonLink from "../../../components/utils/ButtonLink";
import Navbar from "../../../components/utils/NavBar";

interface ParamsProp {
  params: {
    applicationId: string;
    submissionId: string;
  };
}

export default function SingleSubmissionPage({ params }: ParamsProp) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const application = useQuery("getApplication", params.applicationId);
  const submission = useQuery(
    "getSubmission",
    params.applicationId,
    params.submissionId,
    deleting
  );
  const notes = useQuery("getNotes", params.submissionId, deleting);
  const deleteSubmission = useMutation("deleteSubmission");

  useEffect(() => {
    if (deleting) {
      (async () => {
        await deleteSubmission(params.submissionId);
        router.push(`/submissions/${params.applicationId}`);
      })();
    }
  }, [deleting]);

  return (
    <>
      <Navbar />
      {application && submission && !deleting ? (
        <Flex direction="column" mb={8}>
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
                <a href={"mailto:" + submission.fields.get("Email")}>
                  <Button bg="#F3F2FF" variant="grey" marginRight="1vw">
                    <Flex direction="row">
                      <EmailIcon />
                      <Text marginLeft="10px" fontWeight="bold">
                        Email
                      </Text>
                    </Flex>
                  </Button>
                </a>
                <Button
                  bg="#F3F2FF"
                  variant="grey"
                  onClick={() => setDeleting(true)}
                >
                  <Flex direction="row">
                    <DeleteIcon />
                    <Text marginLeft="10px" fontWeight="bold">
                      Remove
                    </Text>
                  </Flex>
                </Button>
              </HStack>
            </Flex>
          </Box>
          <Stack direction="row" spacing="40px">
            <Box w="calc(50% - 40px)" marginLeft="3vw" marginTop="1vw">
              <Tabs>
                <TabList>
                  <Tab>Submission</Tab>
                  <Tab>Admin Fields</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel ml={-8} my={4}>
                    <Summary
                      stepNames={application.steps.map((step) => step.name)}
                      id={params.applicationId}
                      submissionId={params.submissionId}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Box ml={-12} mt={2} mr={0}>
                      <Form
                        step=""
                        id={params.applicationId}
                        submissionId={params.submissionId}
                        isDisabled={false}
                      />
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
            {notes ? (
              <NoteView submissionId={params.submissionId} notes={notes} />
            ) : (
              <Center w="calc(50% - 80px)" pt={14}>
                <Spinner />
              </Center>
            )}
          </Stack>
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
