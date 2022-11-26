import { theme } from "../../app/mui.config";
import { styled } from "@mui/material/styles";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import MuiLinearProgress from "@mui/material/LinearProgress";
import suprise from "../../assets/images/astronot.mp4";

import { Container } from "@mui/material";

const StyledDataGrid = styled(MuiDataGrid)(({}) => {
  return {
    border: "none",
    ".MuiDataGrid-row": {
      transition: "ease-in-out 0.150s",
      ":hover": {
        backgroundColor: theme.palette.grey[100],
      },
    },
    ".MuiDataGrid-cell": {
      color: theme.palette.secondary.main,
      border: "none",
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

function CustomNoRowsOverlay() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <video width="150" autoPlay muted loop>
        <source src={suprise} type="video/mp4" />
      </video>
    </Container>
  );
}

const List = ({
  rows,
  rowCount,
  columns,
  isLoading,
  page,
  pageSize,
  initialState,
  onPageChange,
  onPageSizeChange,
  getRowId,
  checkboxSelection,
}) => {
  return (
    <StyledDataGrid
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      loading={isLoading}
      components={{
        LoadingOverlay: MuiLinearProgress,
        NoRowsOverlay: CustomNoRowsOverlay,
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
      checkboxSelection={checkboxSelection}
      disableColumnMenu
      disableSelectionOnClick
    />
  );
};

export default List;
