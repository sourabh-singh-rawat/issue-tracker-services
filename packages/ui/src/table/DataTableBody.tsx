import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { flexRender, type Row } from "@tanstack/react-table";

export type DataTableBodyProps<TData> = {
  rows: Row<TData>[];
  onRowClick?: (row: TData) => void;
};

export const DataTableBody = <TData,>({ rows, onRowClick }: DataTableBodyProps<TData>) => (
  <TableBody>
    {rows.map((row) => (
      <TableRow
        key={row.id}
        hover={Boolean(onRowClick)}
        sx={onRowClick ? { cursor: "pointer" } : undefined}
        onClick={onRowClick ? () => onRowClick(row.original) : undefined}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);
