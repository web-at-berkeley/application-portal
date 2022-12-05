import {
  ArrowDownIcon,
  ArrowUpIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Center,
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export interface Sorting {
  order: "asc" | "desc";
  field: string;
}

export interface DataTableProps<Data extends object> {
  data: Data[];
  fieldNames: string[];
  columns: ColumnDef<Data, any>[];
  sorting?: Sorting;
  onSortingChange: (newSorting: Sorting) => void;
  fieldsToInclude?: string[];
  onFieldsToIncludeChange: (newFieldsToInclude: string[]) => void;
}

export function DataTable<Data extends object>({
  data,
  columns,
  fieldNames,
  sorting,
  onSortingChange,
  fieldsToInclude,
  onFieldsToIncludeChange,
}: DataTableProps<Data>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table variant="striped">
      <Thead bgColor="#D9D9D9">
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers
              .filter((header) => {
                const field = header.column.columnDef.header!.toString();
                return (
                  field === "" ||
                  !fieldsToInclude ||
                  fieldsToInclude.includes(field)
                );
              })
              .map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = header.column.columnDef.meta;
                const field = header.column.columnDef.header!.toString();
                return (
                  <Th
                    bg="#F3F2FF"
                    key={header.id}
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    isNumeric={meta?.isNumeric}
                    color="black"
                    pl={4}
                    pr={4}
                    minWidth={field === "" ? "72px" : 120}
                  >
                    <Menu>
                      <MenuButton
                        as={Button}
                        textTransform="uppercase"
                        minH="100%"
                        variant="ghost"
                        fontSize="14px"
                        px={2}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {sorting?.field === field &&
                          (sorting.order === "asc" ? (
                            <TriangleUpIcon ml={2} mb={0.5} />
                          ) : (
                            <TriangleDownIcon ml={2} mb={0.5} />
                          ))}
                      </MenuButton>
                      <MenuList fontSize="16px">
                        <MenuItem
                          icon={<ArrowUpIcon boxSize={5} />}
                          onClick={() => {
                            onSortingChange({
                              order: "asc",
                              field,
                            });
                          }}
                          py={2}
                        >
                          Sort Ascending
                        </MenuItem>
                        <MenuItem
                          icon={<ArrowDownIcon boxSize={5} />}
                          onClick={() => {
                            onSortingChange({
                              order: "desc",
                              field,
                            });
                          }}
                          py={2}
                        >
                          Sort Descending
                        </MenuItem>
                        <MenuItem
                          icon={<ViewOffIcon boxSize={5} />}
                          onClick={() => {
                            const newFieldsToInclude =
                              fieldsToInclude ?? fieldNames;
                            if (newFieldsToInclude.includes(field)) {
                              onFieldsToIncludeChange(
                                newFieldsToInclude.filter((f) => f !== field)
                              );
                            } else {
                              onFieldsToIncludeChange([
                                ...newFieldsToInclude,
                                field,
                              ]);
                            }
                          }}
                          py={2}
                        >
                          Hide Column
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Th>
                );
              })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta = cell.column.columnDef.meta;
              return (
                // @ts-expect-error
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                <Td key={cell.id} isNumeric={meta?.isNumeric} pl={4} pr={4}>
                  {typeof cell.getValue() === "boolean" ? (
                    <Center>
                      <Checkbox
                        colorScheme="purple"
                        key={cell.id}
                        checked={cell.getValue() as boolean}
                        defaultChecked={cell.getValue() as boolean}
                        isDisabled
                        _disabled={{
                          textColor: "purple.500",
                        }}
                      />
                    </Center>
                  ) : (
                    <Text
                      noOfLines={1}
                      minWidth={cell.column.columnDef.header === "" ? 0 : 120}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Text>
                  )}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
