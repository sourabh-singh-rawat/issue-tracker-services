import MuiAvatarGroup from "@mui/material/AvatarGroup";
import MuiAvatar from "@mui/material/Avatar";

export default function AvatarGroup({ members = [], total }) {
  return (
    <MuiAvatarGroup max={5} total={total}>
      {members.map((member) => {
        return (
          <MuiAvatar
            alt={member.name}
            key={member.user_id}
            src={member.photo_url}
          >
            {member.name.match(/\b(\w)/g)}
          </MuiAvatar>
        );
      })}
    </MuiAvatarGroup>
  );
}
