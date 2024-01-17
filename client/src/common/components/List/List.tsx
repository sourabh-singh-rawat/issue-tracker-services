import React, { useEffect, useState } from "react";
import {
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
  GridValidRowModel,
  DataGrid as MuiDataGrid,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

const StyledDataGrid = styled(MuiDataGrid)(({ theme }) => ({
  border: "none",
  ".MuiDataGrid-row": {
    ":hover": { backgroundColor: theme.palette.background.default },
  },
  ".MuiDataGrid-cell": {
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider,
  },
  ".MuiDataGrid-columnHeader": {},
  ".MuiDataGrid-columnHeaders": {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadiusLarge,
    backgroundColor: theme.palette.background.paper,
  },
  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },
  ".MuiDataGrid-footerContainer": {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

interface ListProps {
  rows: GridValidRowModel[];
  columns: GridColDef<GridValidRowModel>[];
  rowCount?: number;
  paginationModel?: GridPaginationModel;
  onPaginationModelChange?: (
    model: GridPaginationModel,
    details: GridCallbackDetails,
  ) => void;
  isLoading?: boolean;
}

export default function List({
  rows = [],
  rowCount = 0,
  columns = [],
  isLoading,
  paginationModel,
  onPaginationModelChange,
}: ListProps) {
  const [rowCountState, setRowCountState] = useState(rowCount);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCount !== undefined ? rowCount : prevRowCountState,
    );
  }, [rowCount, setRowCountState]);

  return (
    <StyledDataGrid
      columns={columns}
      slotProps={{ loadingOverlay: {} }}
      getRowId={({ id }) => id as string}
      loading={isLoading}
      rows={rows}
      rowCount={rowCountState}
      rowHeight={40}
      columnHeaderHeight={44}
      pageSizeOptions={[2, 10, 20, 50, 100]}
      paginationMode="server"
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      disableColumnMenu
      disableRowSelectionOnClick
      autoHeight
    />
  );
}
