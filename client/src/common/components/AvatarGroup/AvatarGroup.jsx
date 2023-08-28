/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';

import MuiAvatar from '@mui/material/Avatar';
import MuiAvatarGroup from '@mui/material/AvatarGroup';
import { styled } from '@mui/material/styles';

import Tooltip from '../Tooltip';

const StyledAvatarGroup = styled(MuiAvatarGroup)(({ theme }) => ({
  '& .MuiAvatar-root': {
    fontWeight: theme.typography.fontWeightBold,
    border: 'none',
    marginRight: '4px',
  },
}));

function AvatarGroup({ members, total }) {
  return (
    <StyledAvatarGroup max={5} spacing={-1} total={total}>
      {members.map(({ id, name, photoUrl }) => (
        <Tooltip key={id} title={name}>
          <MuiAvatar
            alt={name}
            src={photoUrl}
            sx={{ '&:hover': { cursor: 'pointer' } }}
          >
            {name.match(/\b(\w)/g)[0]}
          </MuiAvatar>
        </Tooltip>
      ))}
    </StyledAvatarGroup>
  );
}

export default AvatarGroup;
