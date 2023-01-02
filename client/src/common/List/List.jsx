/* eslint-disable react/prop-types */
import React from 'react';

import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import MuiLinearProgress from '@mui/material/LinearProgress';
import theme from '../../config/mui.config';

const StyledDataGrid = styled(MuiDataGrid)(() => ({
  border: 'none',
  '.MuiDataGrid-row': {
    transition: 'ease-in-out 0.150s',
    ':hover': {
      backgroundColor: theme.palette.grey[1400],
      boxShadow: theme.shadows[1],
    },
  },
  '.MuiDataGrid-cell': {
    color: theme.palette.grey[200],
    borderColor: theme.palette.grey[1300],
    borderRight: `${theme.shape.borderWidthDefault} solid ${theme.palette.grey[1200]}`,
  },
  '.MuiDataGrid-columnHeaders': {},
  '& .MuiDataGrid-columnHeaderTitle': {
    color: theme.palette.grey[800],
    fontSize: '14px',
  },
  '.MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '.MuiDataGrid-footerContainer': {
    borderTop: `${theme.shape.borderWidthDefault} solid ${theme.palette.grey[1200]}`,
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
