import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { DataTableBody } from "./DataTableBody";
import { DataTableHead } from "./DataTableHead";

export type DataTableProps<TData, TValue = unknown> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  ariaLabel?: string;
  onRowClick?: (row: TData) => void;
};

export const DataTable = <TData, TValue = unknown>({
  data,
  columns,
  ariaLabel,
  onRowClick,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small" aria-label={ariaLabel}>
        <DataTableHead headerGroups={table.getHeaderGroups()} />
        <DataTableBody rows={table.getRowModel().rows} onRowClick={onRowClick} />
      </Table>
    </TableContainer>
  );
};
