/* eslint-disable react/jsx-curly-newline */
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MuiAvatar from '@mui/material/Avatar';
import MuiTypography from '@mui/material/Typography';
import theme from '../../../../config/mui.config';

import List from '../../../../common/List';

import { useGetCollaboratorsQuery } from '../../collaborator-list.api';

import {
  setCollaboratorList,
  updateCollaboratorList,
} from '../../collaborator-list.slice';

function CollaboratorList() {
  const dispatch = useDispatch();
  const { rows } = useSelector((store) => store.collaboratorList);
  const { page, pageSize, rowCount } = useSelector(
    (store) => store.collaboratorList,
  );
  const getCollaboratorsQuery = useGetCollaboratorsQuery();
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 0.45,
      renderCell: ({ id, value, row: { photoUrl } }) => (
        <>
          <MuiAvatar
            src={photoUrl}
            sx={{
              width: '30px',
              height: '30px',
              marginRight: '10px',
              backgroundColor: theme.palette.grey[700],
            }}
          >
            <MuiTypography variant="body2">
              {value.match(/\b(\w)/g)[0]}
            </MuiTypography>
          </MuiAvatar>
          <Link style={{ textDecoration: 'none' }} to={`/profile/${id}`}>
            <MuiTypography
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                '&:hover': {
                  color: theme.palette.primary[900],
                  textDecoration: 'none!important',
                },
              }}
              variant="body2"
            >
              {value}
            </MuiTypography>
          </Link>
        </>
      ),
    },
    { field: 'email', headerName: 'Email', flex: 0.3 },
  ];

  useEffect(() => {
    if (getCollaboratorsQuery.data) {
      dispatch(setCollaboratorList(getCollaboratorsQuery.data));
    }
  }, [getCollaboratorsQuery.isSuccess]);

  return (
    <List
      columns={columns}
      getRowId={(params) => params.id}
      initialState={{
        sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
      }}
      isLoading={getCollaboratorsQuery.isLoading}
      page={page}
      pageSize={pageSize}
      rowCount={rowCount}
      rows={rows}
      onPageChange={(newPage) =>
        dispatch(updateCollaboratorList({ page: newPage }))
      }
      onPageSizeChange={(newPageSize) =>
        dispatch(updateCollaboratorList({ newPageSize }))
      }
    />
  );
}

export default CollaboratorList;
