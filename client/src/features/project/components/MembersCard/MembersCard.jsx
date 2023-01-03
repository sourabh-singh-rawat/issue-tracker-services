/* eslint-disable nonblock-statement-body-position */
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Skeleton from '@mui/material/Skeleton';
import MuiGrid from '@mui/material/Grid';

import AvatarGroup from '../../../../common/AvatarGroup';

import { useGetProjectMembersQuery } from '../../project.api';

import { setMembers } from '../../project.slice';

function MembersCard() {
  const { id } = useParams();
  const dispatch = useDispatch((store) => store.project.members.rows);
  const members = useSelector((store) => store.project.members);
  const getProjectMembersQuery = useGetProjectMembersQuery(id);

  useEffect(() => {
    if (getProjectMembersQuery.isSuccess) {
      dispatch(setMembers(getProjectMembersQuery.data));
    }
  }, [getProjectMembersQuery.isSuccess]);

  return (
    <MuiGrid container>
      <MuiGrid sx={{ marginTop: '8px' }} item>
        {members.isLoading ? (
          <Skeleton height="40px" variant="circular" width="40px" />
        ) : (
          <AvatarGroup members={members.rows} total={members.rowCount} />
        )}
      </MuiGrid>
    </MuiGrid>
  );
}

export default MembersCard;
