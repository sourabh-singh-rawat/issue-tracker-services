/* eslint-disable implicit-arrow-linebreak */
import { Link, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { enIN } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';

import MuiAvatar from '@mui/material/Avatar';
import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';

import List from '../../../../common/List';

import { useGetProjectMembersQuery } from '../../project.api';

import { setMembers } from '../../project.slice';

function MemberList() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { rows, rowCount, pageSize } = useSelector(
    (store) => store.project.members,
  );
  const projectMembers = useGetProjectMembersQuery(id);

  useEffect(() => {
    if (projectMembers.isSuccess) dispatch(setMembers(projectMembers.data));
  }, [projectMembers.data]);

  const columns = [
    {
      flex: 0.3,
      field: 'name',
      headerName: 'Name',
      minWidth: 200,
      renderCell: ({ value, row: { photoUrl } }) => (
        <MuiGrid
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          container
        >
          <MuiGrid item>
            <MuiAvatar
              src={photoUrl}
              sx={{
                width: '24px',
                height: '24px',
                marginRight: '8px',
              }}
            >
              {value.match(/\b(\w)/g)[0]}
            </MuiAvatar>
          </MuiGrid>
          <MuiGrid item>
            <Link style={{ textDecoration: 'none' }} to={`/profile/${id}`}>
              <MuiTypography
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.main',
                    textDecoration: 'none !important',
                  },
                }}
                variant="body2"
              >
                {value}
              </MuiTypography>
            </Link>
          </MuiGrid>
        </MuiGrid>
      ),
    },
    {
      flex: 0.3,
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      renderCell: ({ value }) => (
        <MuiTypography
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
          variant="body2"
        >
          {value[0].toUpperCase() + value.slice(1, value.length)}
        </MuiTypography>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Creation Date',
      minWidth: 200,
      renderCell: ({ value }) =>
        format(parseISO(value), 'PP', { locale: enIN }),
    },
    { field: 'projectMemberRoleName', headerName: 'Role', minWidth: 200 },
  ];

  return (
    <List
      columns={columns}
      getRowId={(row) => row.memberId}
      initialState={{
        sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
      }}
      isLoading={projectMembers.isLoading}
      pageSize={pageSize}
      rowCount={rowCount}
      rows={rows}
    />
  );
}

export default MemberList;
