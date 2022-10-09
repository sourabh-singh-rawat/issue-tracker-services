import MuiAvatarGroup from "@mui/material/AvatarGroup";
import MuiAvatar from "@mui/material/Avatar";

export default function AvatarGroup({ members = [], total }) {
  return (
    <MuiAvatarGroup max={4} total={total}>
      {members.map((member) => {
        return (
          <MuiAvatar key={member.user_id} alt={member.name} src="">
            {member.name.match(/\b(\w)/g)}
          </MuiAvatar>
        );
      })}
    </MuiAvatarGroup>
  );
}
