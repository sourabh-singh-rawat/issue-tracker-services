/* eslint-disable react/prop-types */
import React from 'react';

import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

import MuiLinearProgress from '@mui/material/LinearProgress';

const StyledDataGrid = styled(MuiDataGrid)(({ theme }) => ({
  border: 'none',
  '.MuiDataGrid-row': {
    color: theme.palette.text.primary,
    transition: 'ease-in-out 0.150s',
    ':hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  '.MuiDataGrid-cell': {
    color: theme.palette.text.primary,
    borderColor: theme.palette.grey[200],
  },
  '.MuiDataGrid-columnHeaders': {},
  '& .MuiDataGrid-columnHeaderTitle': {
    color: theme.palette.grey[600],
    fontSize: '14px',
    fontWeight: 500,
  },
  '.MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '.MuiDataGrid-footerContainer': {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
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
      experimentalFeatures={{ newEditingApi: true }}
      getRowId={getRowId}
      initialState={initialState}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      paginationMode="server"
      rowCount={rowCount}
      rows={rows}
      rowsPerPageOptions={[10, 20, 50, 100]}
      autoHeight
      disableColumnMenu
      disableSelectionOnClick
      pagination
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
}

export default List;
