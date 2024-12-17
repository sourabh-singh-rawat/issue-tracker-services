import {
  Avatar,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppSelector } from "../../../../common/hooks";
import WorkspaceMenu from "../WorkspaceMenu";

export default function WorkspaceSwitcher() {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { workspaces, current: main } = useAppSelector((s) => s.workspace);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <List disablePadding>
      {main && (
        <ListItemButton onClick={handleClick} disableRipple>
          <ListItemIcon>
            <Avatar
              alt={main.name[0]}
              sx={{
                height: theme.spacing(3.5),
                width: theme.spacing(3.5),
                bgcolor: theme.palette.primary.main,
              }}
              variant="rounded"
            >
              <Typography variant="h6">{main.name[0]}</Typography>
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={main.name} />
          <IconButton disableRipple>
            {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </ListItemButton>
      )}
      {main && (
        <WorkspaceMenu
          anchorEl={anchorEl}
          options={workspaces}
          selectedOption={main}
          handleClose={handleClose}
        />
      )}
    </List>
  );
}
