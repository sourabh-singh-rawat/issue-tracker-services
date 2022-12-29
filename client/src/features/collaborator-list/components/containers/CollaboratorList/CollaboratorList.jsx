/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable import/named */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import MuiAvatar from '@mui/material/Avatar';
import MuiTypography from '@mui/material/Typography';

import List from '../../../../../common/lists/List';

import { useGetCollaboratorsQuery } from '../../../api/collaborator-list.api';

import {
  setCollaboratorList,
  updateCollaboratorList,
} from '../../../slice/collaborator-list.slice';

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
            sx={{ width: '24px', height: '24px', marginRight: '10px' }}
          >
            {value.match(/\b(\w)/g)[0]}
          </MuiAvatar>
          <Link style={{ textDecoration: 'none' }} to={`/profile/${id}`}>
            <MuiTypography
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                '&:hover': {
                  color: 'primary.main',
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
      onPageSizeChange={(pageSize) =>
        dispatch(updateCollaboratorList({ pageSize }))
      }
    />
  );
}

export default CollaboratorList;
