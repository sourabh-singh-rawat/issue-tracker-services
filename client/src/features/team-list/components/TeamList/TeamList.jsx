import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { format, parseISO } from 'date-fns';

import Typography from '@mui/material/Typography';

import { useGetTeamsQuery } from '../../../team/team.api';

import { setList } from '../../team-list.slice';

import List from '../../../../common/List';

function TeamList() {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetTeamsQuery();
  const teams = useSelector((store) => store.teamList.rows);

  useEffect(() => {
    if (data) dispatch(setList({ rows: data.rows, rowCount: data.rowCount }));
  }, [isSuccess]);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 200,
      flex: 0.3,
      renderCell: (params) => (
        <Link
          style={{ textDecoration: 'none' }}
          to={`/teams/${params.row.id}/overview`}
        >
          <Typography
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
            {params.row.name}
          </Typography>
        </Link>
      ),
    },
    {
      field: 'members',
      headerName: 'Members',
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 200,
      flex: 0.2,
      renderCell: ({ value }) => (
        <Typography variant="body2">
          {value ? format(parseISO(value), 'eee, PP') : '-'}
        </Typography>
      ),
    },
  ];

  return (
    <List columns={columns} rows={teams} autoHeight disableSelectionOnClick />
  );
}

export default TeamList;
