import { styled } from "@mui/material/styles";
import MuiAvatarGroup from "@mui/material/AvatarGroup";
import MuiAvatar from "@mui/material/Avatar";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";

const StyledAvatarGroup = styled(MuiAvatarGroup)(({ theme }) => {
  return {
    "& .MuiAvatar-root": { border: "none", marginRight: "4px" },
  };
});

const AvatarGroup = ({ members = [], total }) => {
  return (
    <StyledAvatarGroup max={5} total={total}>
      {members.map((member) => {
        return (
          <TooltipWrapper title={member.name}>
            <MuiAvatar
              alt={member.name}
              key={member.user_id}
              src={member.photo_url}
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              {member.name.match(/\b(\w)/g)[0]}
            </MuiAvatar>
          </TooltipWrapper>
        );
      })}
    </StyledAvatarGroup>
  );
};

export default AvatarGroup;
