import { theme } from "../../app/mui.config";
import { styled } from "@mui/material/styles";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

const StyledDataGrid = styled(MuiDataGrid)(({}) => {
  return {
    border: "none",
    ".MuiDataGrid-cell": {
      color: theme.palette.secondary.main,
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontSize: "14px",
      fontWeight: 500,
    },
    ".MuiDataGrid-columnHeaders": {
      color: theme.palette.secondary.dark,
      borderBottom: `2px solid ${theme.palette.outline.surfaceVariant}`,
    },
    ".MuiDataGrid-columnSeparator": {
      display: "none",
    },
    ".MuiDataGrid-footerContainer": {
      borderTop: `2px solid ${theme.palette.outline.surfaceVariant}`,
    },
  };
});

const List = ({
  rows,
  rowCount,
  columns,
  loading,
  page,
  pageSize,
  initialState,
  onPageChange,
  onPageSizeChange,
  getRowId,
}) => {
  return (
    <StyledDataGrid
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      loading={loading}
      components={{
        LoadingOverlay: MuiLinearProgress,
      }}
      rowsPerPageOptions={[10, 20, 50, 100]}
      pagination
      page={page}
      pageSize={pageSize}
      paginationMode="server"
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      getRowId={getRowId}
      initialState={initialState}
      experimentalFeatures={{ newEditingApi: true }}
      autoHeight
      disableColumnMenu
      disableSelectionOnClick
    />
  );
};

export default List;
