import { InfoIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";

import { Document } from "../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "../../../convex/_generated/react";
import { DataTable, Sorting } from "../../components/admin/DataTable";
import DesktopOnly from "../../components/utils/DesktopOnly";
import Navbar from "../../components/utils/NavBar";
import PlainLink from "../../components/utils/PlainLink";

interface MapSchemaTypes {
  shortText: string;
  multipleChoice: string;
  checkbox: string;
  longText: string;
}

type MapSchema<T extends Record<string, keyof MapSchemaTypes>> = {
  -readonly [K in keyof T]: MapSchemaTypes[T[K]];
};

function asSchema<T extends Record<string, keyof MapSchemaTypes>>(t: T): T {
  return t;
}

interface ParamsProp {
  params: {
    id: string;
  };
}

export default function Submissions({ params }: ParamsProp) {
  const [keyword, setKeyword] = useState("");
  const [sorting, setSorting] = useState<Sorting | undefined>();
  const [fieldsToInclude, setFieldsToInclude] = useState<
    string[] | undefined
  >();
  const [submissions, setSubmissions] = useState<
    Document<"submissions">[] | undefined
  >();

  const application = useQuery("getApplication", params.id);
  const queriedSubmissions = useQuery("getAllSubmissions", params.id, {
    keyword,
    ...(sorting ? { sorting } : {}),
    ...(fieldsToInclude ? { fieldsToInclude } : {}),
  });
  const deleteSubmission = useMutation("deleteSubmission");

  useEffect(() => {
    if (queriedSubmissions) {
      setSubmissions(queriedSubmissions);
    }
  }, [queriedSubmissions]);

  if (!application || !submissions) {
    return (
      <Center mt="50vh">
        <Spinner size="xl" color="convex.lightBlue" />
      </Center>
    );
  }

  const applicationTypes = asSchema(
    [...application.steps, { fields: application.adminFields }].reduce(
      (ac, currentValue) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const currentStep = Object.assign(
          {},
          ...currentValue.fields.map((field) => {
            return { [field.name]: field.type };
          })
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
          ...ac,
          ...currentStep,
        };
      },
      {}
    )
  );

  type Application = MapSchema<typeof applicationTypes>;

  const columnHelper = createColumnHelper<Application>();

  const fieldNames = [...application.steps, { fields: application.adminFields }]
    .map((step) => {
      return step.fields.map((field) => {
        return field.name;
      });
    })
    .flat();

  const columns = [
    columnHelper.accessor("button", {
      header: "",
      cell: (ctx) => {
        return (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HiEllipsisHorizontal />}
              aria-label="Options"
              backgroundColor="transparent"
              maxW="20px"
            />
            <MenuList>
              <MenuItem>
                <PlainLink
                  href={`/single-submission/${params.id}/${submissions[
                    ctx.row.index
                  ]._id.toString()}`}
                  fontWeight="normal"
                >
                  Show Profile
                </PlainLink>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  deleteSubmission(submissions[ctx.row.index]._id.toString())
                }
              >
                Delete Profile
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
    }),
    ...fieldNames
      .filter(
        (fieldName) => !fieldsToInclude || fieldsToInclude.includes(fieldName)
      )
      .map((field) => {
        return columnHelper.accessor(field, {
          cell: (info) => info.getValue(),
          header: field,
        });
      }),
  ];

  return (
    <Box>
      <Navbar />
      <Tag ml="4rem" mt="3rem">
        <TagLeftIcon boxSize="12px" as={InfoIcon} />
        <TagLabel>
          To view a single applicant&apos;s details, click on the three dots
          next to one of the submissions. You can also click on one of the
          column headers to hide columns and change sorting options.
        </TagLabel>
      </Tag>
      <Flex direction="column" mx="4rem" my="2rem">
        <Flex justify="space-between">
          <Text
            fontSize="3xl"
            marginLeft="1rem"
            marginBottom="0.5rem"
            fontWeight="bold"
          >
            APPLICANTS
          </Text>
          <HStack spacing={4} marginRight="1rem">
            <DesktopOnly>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Search2Icon color="black" />
                </InputLeftElement>
                <Input
                  w="400px"
                  mb="1.5rem"
                  type="text"
                  placeholder="Keyword Search"
                  borderRadius="2xl"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </InputGroup>
            </DesktopOnly>
          </HStack>
        </Flex>
        <Flex width="100%" overflowX="scroll">
          <DataTable
            columns={columns}
            fieldNames={fieldNames}
            data={
              submissions?.map((s) =>
                Object.fromEntries(
                  Array.from(s.fields.entries()).filter(
                    ([field]) =>
                      fieldsToInclude === undefined ||
                      fieldsToInclude.includes(field)
                  )
                )
              ) ?? []
            }
            sorting={sorting}
            onSortingChange={setSorting}
            fieldsToInclude={fieldsToInclude}
            onFieldsToIncludeChange={setFieldsToInclude}
          />
        </Flex>
      </Flex>
    </Box>
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
