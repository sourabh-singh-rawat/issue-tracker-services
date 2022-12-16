import { styled } from "@mui/material/styles";
import MuiAvatarGroup from "@mui/material/AvatarGroup";
import MuiAvatar from "@mui/material/Avatar";

import Tooltip from "../../utilities/Tooltip";

const StyledAvatarGroup = styled(MuiAvatarGroup)(({ theme }) => {
  return {};
});

const AvatarGroup = ({ members, total }) => {
  return (
    <StyledAvatarGroup max={5} total={total} spacing={-1}>
      {members.map((member) => {
        return (
          <Tooltip title={member.name} key={member.id}>
            <MuiAvatar
              alt={member.name}
              src={member.photo_url}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              {member.name.match(/\b(\w)/g)[0]}
            </MuiAvatar>
          </Tooltip>
        );
      })}
    </StyledAvatarGroup>
  );
};

export default AvatarGroup;
