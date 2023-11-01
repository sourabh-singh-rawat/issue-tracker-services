import React from "react";

import MuiAvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "../Tooltip";
import Avatar from "../Avatar";

export default function AvatarGroup({ members = [], total }) {
  return (
    <MuiAvatarGroup
      max={2}
      spacing={-1}
      total={total}
      sx={{ flexDirection: "row" }}
    >
      {members.map(({ id, name, photoUrl }) => (
        <Tooltip key={id} title={name}>
          <Avatar key={id} label={name} photoUrl={photoUrl} />
        </Tooltip>
      ))}
    </MuiAvatarGroup>
  );
}
