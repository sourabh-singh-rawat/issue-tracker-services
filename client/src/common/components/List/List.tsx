/* eslint-disable react/prop-types */
import React, { useEffect } from "react";

import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import MuiLinearProgress from "@mui/material/LinearProgress";

const StyledDataGrid = styled(MuiDataGrid)(({ theme }) => ({
  border: "none",
  ".MuiDataGrid-row": {
    transition: "ease-in-out 0.150s",
    ":hover": {
      backgroundColor: theme.palette.grey[100],
    },
  },
  ".MuiDataGrid-cell": {
    color: theme.palette.text.primary,
    borderColor: theme.palette.grey[200],
    borderRight: `${theme.shape.borderWidthDefault} solid ${theme.palette.grey[1200]}`,
  },
  ".MuiDataGrid-columnHeaders": {
    borderBottom: `${theme.shape.borderWidthDefault} solid ${theme.palette.grey[200]}`,
  },
  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },
  ".MuiDataGrid-footerContainer": {
    borderTop: `${theme.shape.borderWidthDefault} solid ${theme.palette.grey[200]}`,
  },
}));

function List({
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
}) {
  return (
    <StyledDataGrid
      checkboxSelection={checkboxSelection}
      columns={columns}
      components={{
        LoadingOverlay: MuiLinearProgress,
      }}
      getRowId={getRowId}
      initialState={initialState}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      paginationMode="server"
      rows={rows}
      rowCount={rowCount}
      rowHeight={40}
      rowsPerPageOptions={[10, 20, 50, 100]}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      autoHeight
      disableColumnMenu
      disableSelectionOnClick
      pagination
    />
  );
}

export default List;
