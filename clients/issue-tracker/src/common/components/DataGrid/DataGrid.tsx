import { styled } from "@mui/material/styles";
import {
  GridColDef,
  GridValidRowModel,
  DataGrid as MuiDataGrid,
} from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

const StyledDataGrid = styled(MuiDataGrid)(({ theme }) => {
  const palette = theme.palette;
  const bgPalette = palette.background;
  const borderColor = theme.palette.divider;
  const border = `1px solid ${borderColor}`;
  const borderRadiusMedium = theme.shape.borderRadiusMedium;

  return {
    border: "none",
    ".MuiDataGrid-cell": { color: palette.text.primary, borderColor },
    ".MuiDataGrid-columnHeaders": { borderColor },
    ".MuiDataGrid-columnSeparator": { display: "none" },
  };
});

interface DataGridProps {
  rows: GridValidRowModel[];
  columns: GridColDef<GridValidRowModel>[];
  isLoading?: boolean;
  hideFooter?: boolean;
  initialState?: GridInitialStateCommunity;
}

/**
 * A Table component
 * @param props.rows
 * @param props.columns
 * @returns
 */
export const DataGrid = ({
  rows = [],
  columns = [],
  isLoading,
  hideFooter = false,
  initialState,
}: DataGridProps) => {
  return (
    <StyledDataGrid
      columns={columns}
      slotProps={{ loadingOverlay: {} }}
      getRowId={({ id }) => id}
      loading={isLoading}
      rows={rows}
      rowHeight={32}
      columnHeaderHeight={32}
      disableColumnMenu
      disableRowSelectionOnClick
      autoHeight
      hideFooter={hideFooter}
      initialState={initialState}
    />
  );
};
