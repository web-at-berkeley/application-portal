import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { GrFilter } from "react-icons/gr";
import { HiEllipsisHorizontal } from "react-icons/hi2";

import { useQuery } from "../../../convex/_generated/react";
import { DataTable } from "../../components/admin/DataTable";
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
  const application = useQuery("getApplication", params.id);
  const submissions = useQuery("getAllSubmissions", params.id);
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
      cell: () => {
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
              <PlainLink
                href="/singleApp/zrUQPf98OeGetO4sgrD18su/BSMWqstYIimcNgs7w2f4sfw"
                w="100%"
              >
                <MenuItem>Show Profile</MenuItem>
              </PlainLink>
              <MenuItem>Delete Profile</MenuItem>
            </MenuList>
          </Menu>
        );
      },
    }),
    ...fieldNames.map((field) => {
      return columnHelper.accessor(field, {
        cell: (info) => info.getValue(),
        header: field,
      });
    }),
  ];

  return (
    <Box>
      <Navbar />
      <Flex direction="column" mx="4rem" my="3rem">
        <Flex justify="space-between">
          <Text
            fontSize="2xl"
            marginLeft="1rem"
            marginBottom="1.5rem"
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
                  type="text"
                  placeholder="Keyword Search"
                  borderRadius="2xl"
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={GrFilter} color="black" />
                </InputLeftElement>
                <Input type="text" placeholder="Filters" borderRadius="2xl" />
              </InputGroup>
            </DesktopOnly>
          </HStack>
        </Flex>
        <Flex width="100%" overflowX="scroll">
          <DataTable
            columns={columns}
            data={submissions?.map((s) => Object.fromEntries(s.fields)) ?? []}
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
