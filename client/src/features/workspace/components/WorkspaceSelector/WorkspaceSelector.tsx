import React from "react";

import { ListItemButton, styled, useTheme } from "@mui/material";
import MuiAvatar from "@mui/material/Avatar";

import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemText from "@mui/material/ListItemText";

const StyledListItemButton = styled(ListItemButton)(() => ({
  "&.MuiListItemButton-root": {},
}));

const StyledListItemText = styled(MuiListItemText)(() => {
  return {
    "& .MuiListItemText-primary": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      flexGrow: 1,
    },
  };
});

const StyledListItem = styled(MuiListItem)(() => {
  return {
    "& .MuiListItemSecondaryAction-root": {
      top: "55%",
    },
  };
});

interface WorkspaceSelectorProps {
  isLargeScreen: boolean;
  onClickShowWorkspaces: (event: React.MouseEvent<HTMLElement>) => void;
  label?: string;
}

export default function WorkspaceSelector({
  label,
  isLargeScreen,
  onClickShowWorkspaces,
}: WorkspaceSelectorProps) {
  const theme = useTheme();

  return (
    <StyledListItem
      onClick={onClickShowWorkspaces}
      sx={{ marginTop: 1 }}
      disableGutters
      disablePadding
    >
      <StyledListItemButton
        sx={{ borderRadius: theme.shape.borderRadiusMedium }}
        disableRipple
        disableGutters
      >
        <div
          style={{
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
          }}
        >
          <MuiAvatar
            sx={{
              width: 24,
              height: 24,
              fontSize: theme.typography.body1,
              fontWeight: theme.typography.fontWeightBold,
            }}
          >
            {label && label[0]}
          </MuiAvatar>
        </div>
        <StyledListItemText primary={label} />
        {isLargeScreen && <UnfoldMoreTwoToneIcon />}
      </StyledListItemButton>
    </StyledListItem>
  );
}
