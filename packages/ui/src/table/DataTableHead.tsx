import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { flexRender, type HeaderGroup } from "@tanstack/react-table";

export type DataTableHeadProps<TData> = {
  headerGroups: HeaderGroup<TData>[];
};

export const DataTableHead = <TData,>({ headerGroups }: DataTableHeadProps<TData>) => (
  <TableHead>
    {headerGroups.map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableCell key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableHead>
);
