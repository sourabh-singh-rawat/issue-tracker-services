import MuiLinearProgress from "@mui/material/LinearProgress";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

const StyledDataGrid = styled(MuiDataGrid)(({}) => {
  return {
    border: "none",
    ".MuiDataGrid-cell": {
      color: "text.primary",
      border: "none",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontSize: "14px",
      fontWeight: 600,
    },
    ".MuiDataGrid-columnHeaders": {
      borderBottom: "2px solid #DFE1E6",
    },
    ".MuiDataGrid-columnSeparator": {
      display: "none",
    },
    ".MuiDataGrid-footerContainer": {
      borderTop: "2px solid #DFE1E6",
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
      components={{ LoadingOverlay: MuiLinearProgress }}
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
