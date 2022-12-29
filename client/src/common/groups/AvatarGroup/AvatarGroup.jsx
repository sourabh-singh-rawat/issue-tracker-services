/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import MuiAvatarGroup from '@mui/material/AvatarGroup';
import MuiAvatar from '@mui/material/Avatar';

import Tooltip from '../../utilities/Tooltip';

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
      {members.map((member) => (
        <Tooltip key={member.id} title={member.name}>
          <MuiAvatar
            alt={member.name}
            src={member.photoUrl}
            sx={{
              '&:hover': { cursor: 'pointer' },
            }}
          >
            {member.name.match(/\b(\w)/g)[0]}
          </MuiAvatar>
        </Tooltip>
      ))}
    </StyledAvatarGroup>
  );
}

export default AvatarGroup;
