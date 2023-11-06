import React from "react";

import { styled, useTheme } from "@mui/material";
import Tooltip from "../Tooltip";
import Avatar from "../Avatar";
import MuiAvatarGroup from "@mui/material/AvatarGroup";

const StyledAvatarGroup = styled(MuiAvatarGroup)(({ theme }) => ({
  "& .MuiAvatar-root": {
    borderColor: theme.palette.background.default,
    width: theme.spacing(3.25),
    height: theme.spacing(3.25),
  },
  "& .MuiAvatarGroup-root": {},
  "& .MuiAvatarGroup-avatar": {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginLeft: theme.spacing(-0.75),
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    borderColor: "transparent",
  },
}));

export interface Person {
  id: string;
  name: string;
  photoUrl: string;
}

interface AvatarGroupProps {
  members: Person[];
  total: number;
  max?: number;
}

export default function AvatarGroup({
  max = 3,
  members = [],
  total,
}: AvatarGroupProps) {
  const theme = useTheme();

  return (
    <StyledAvatarGroup max={max} total={total}>
      {members.map(({ id, name, photoUrl }) => (
        <Tooltip key={id} title={name}>
          <Avatar
            key={id}
            label={name}
            photoUrl={photoUrl}
            height={theme.spacing(3)}
            width={theme.spacing(3)}
          />
        </Tooltip>
      ))}
    </StyledAvatarGroup>
  );
}
