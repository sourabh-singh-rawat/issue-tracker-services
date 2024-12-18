import {
  Avatar,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
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
  const { workspaces, current, isLoading } = useAppSelector((s) => s.workspace);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <List disablePadding>
      {isLoading ? (
        <ListItemButton>
          <ListItemText>
            <Skeleton />
          </ListItemText>
        </ListItemButton>
      ) : (
        current && (
          <ListItemButton onClick={handleClick} disableRipple>
            <ListItemIcon>
              <Avatar
                alt={current.name[0]}
                sx={{
                  height: theme.spacing(3.5),
                  width: theme.spacing(3.5),
                  bgcolor: theme.palette.primary.main,
                }}
                variant="rounded"
              >
                <Typography variant="h6">{current.name[0]}</Typography>
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={current.name} />
            <IconButton disableRipple>
              {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </ListItemButton>
        )
      )}
      {current && (
        <WorkspaceMenu
          anchorEl={anchorEl}
          options={workspaces}
          selectedOption={current}
          handleClose={handleClose}
        />
      )}
    </List>
  );
}
