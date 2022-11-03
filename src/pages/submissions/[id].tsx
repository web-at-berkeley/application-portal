import { Search2Icon } from "@chakra-ui/icons";
import { GrFilter } from "react-icons/gr";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import {
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "../../components/admin/DataTable";
import { application } from "../../components/form/exampleData";

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

const applicationTypes = asSchema(
  application.steps.reduce((ac, currentValue) => {
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
  }, {})
);

type Application = MapSchema<typeof applicationTypes>;

interface ParamsProp {
  params: {
    id: string;
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
const data: MapSchema<{}>[] = [
  {
    no: "01",
    "First Name": "Venezia",
    "Last Name": "Hartanto",
    position: "Designer",
    submissionDate: "10/2/2022",
    interviewScore: 94,
    status: "ACCEPTED",
    button: "",
  },
  {
    no: "01",
    "First Name": "Anish",
    "Last Name": "Shanbhag",
    position: "Designer",
    submissionDate: "10/2/2022",
    interviewScore: 94,
    status: "ACCEPTED",
    button: "",
  },
  {
    no: "01",
    "First Name": "William",
    "Last Name": "Henderson",
    position: "Designer",
    submissionDate: "10/2/2022",
    interviewScore: 94,
    status: "ACCEPTED",
    button: "",
  },
];

const columnHelper = createColumnHelper<Application>();

const fieldNames = application.steps
  .map((step) => {
    return step.fields.map((field) => {
      return field.name;
    });
  })
  .flat();

const columns = fieldNames.map((field) => {
  return columnHelper.accessor(field, {
    cell: (info) => info.getValue(),
    header: field,
  });
});

columns.push(
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
          />
          <MenuList>
            <MenuItem>Show Profile</MenuItem>
            <MenuItem>Delete Profile</MenuItem>
          </MenuList>
        </Menu>
      );
    },
  })
);

export default function Test() {
  return (
    <Flex direction="column" margin="4rem">
      <Heading as="h3" size="lg" marginBottom="2rem" fontWeight="medium">
        WDBs Applicant Data
      </Heading>
      <Flex justify="space-between">
        <Text
          fontSize="2xl"
          marginLeft="1rem"
          marginBottom="1.5rem"
          fontWeight="medium"
        >
          Applicants
        </Text>
        <HStack spacing={4} marginRight="1rem">
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
        </HStack>
      </Flex>
      <Flex width="100%" overflowX="scroll">
        <DataTable columns={columns} data={data} />
      </Flex>
    </Flex>
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
