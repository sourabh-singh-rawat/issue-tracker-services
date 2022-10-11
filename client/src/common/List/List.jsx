import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";

export default function List({
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
}) {
  const styles = {
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

  return (
    <MuiDataGrid
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      loading={loading}
      rowsPerPageOptions={[10, 20, 50, 100]}
      pagination
      page={page}
      pageSize={pageSize}
      paginationMode="server"
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      getRowId={getRowId}
      initialState={initialState}
      sx={styles}
      experimentalFeatures={{ newEditingApi: true }}
      autoHeight
      disableColumnMenu
      disableSelectionOnClick
    />
  );
}
