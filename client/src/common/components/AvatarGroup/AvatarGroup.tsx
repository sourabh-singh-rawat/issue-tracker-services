import React from "react";

import { IconButton, styled, useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiAvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "../Avatar";
import Tooltip from "../Tooltip";
import AddIcon from "@mui/icons-material/Add";

const StyledAvatarGroup = styled(MuiAvatarGroup)(({ theme }) => ({
  padding: 0,
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
  onClick: () => void;
  max?: number;
}

export default function AvatarGroup({
  max = 3,
  members = [],
  onClick,
  total,
}: AvatarGroupProps) {
  const theme = useTheme();

  return (
    <MuiGrid container>
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
      {onClick && (
        <IconButton
          onClick={onClick}
          sx={{
            height: theme.spacing(3.5),
            width: theme.spacing(3.5),
          }}
          disableRipple
        >
          <AddIcon />
        </IconButton>
      )}
    </MuiGrid>
  );
}
