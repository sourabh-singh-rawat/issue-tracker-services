import React, { useEffect, useState } from "react";
import {
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
  GridValidRowModel,
  DataGrid as MuiDataGrid,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

const StyledDataGrid = styled(MuiDataGrid)(({ theme }) => {
  const palette = theme.palette;
  const bgPalette = palette.background;
  const borderColor = theme.palette.divider;
  const border = `1px solid ${borderColor}`;
  const borderRadiusMedium = theme.shape.borderRadiusMedium;

  return {
    border: "none",
    "&.MuiDataGrid-root": { border, borderRadius: borderRadiusMedium },
    ".MuiDataGrid-row": {},
    ".MuiDataGrid-cell": { color: palette.text.primary, borderColor },
    ".MuiDataGrid-columnHeader": {},
    ".MuiDataGrid-columnHeaders": {
      borderBottom: border,
      borderRadius: `${borderRadiusMedium} ${borderRadiusMedium} 0 0 `,
      backgroundColor: bgPalette.paper,
    },
    ".MuiDataGrid-columnSeparator": { display: "none" },
    ".MuiDataGrid-footerContainer": {
      borderTop: border,
    },
  };
});

interface Props {
  rows: GridValidRowModel[];
  columns: GridColDef<GridValidRowModel>[];
  rowCount?: number;
  paginationModel?: GridPaginationModel;
  onPaginationModelChange?: (
    model: GridPaginationModel,
    details: GridCallbackDetails,
  ) => void;
  isLoading?: boolean;
  hideFooter?: boolean;
}

export default function List({
  rows = [],
  rowCount = 0,
  columns = [],
  isLoading,
  hideFooter = false,
  paginationModel,
  onPaginationModelChange,
}: Props) {
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
      hideFooter={hideFooter}
    />
  );
}
