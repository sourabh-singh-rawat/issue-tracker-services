import React, { useEffect, useState } from "react";
import {
  Avatar,
  IconButton,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
  useTheme,
} from "@mui/material";

import WorkspaceMenu from "../WorkspaceMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppSelector } from "../../../../common/hooks";
import { Workspace } from "../../../../api/codegen/gql/graphql";

export default function WorkspaceSwitcher() {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { workspaces, defaultWorkspace } = useAppSelector((s) => s.workspace);
  const { name } = defaultWorkspace;
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (defaultWorkspace) setSelectedWorkspace(defaultWorkspace);
  }, [defaultWorkspace]);

  return (
    <List disablePadding>
      <ListItemButton onClick={handleClick} disableRipple>
        <ListItemIcon>
          <Avatar
            alt={name && name[0]}
            sx={{
              height: theme.spacing(3.5),
              width: theme.spacing(3.5),
              bgcolor: theme.palette.primary.main,
            }}
            variant="rounded"
          >
            <Typography variant="h6">{name && name[0]}</Typography>
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={name} />
        <IconButton disableRipple>
          {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </ListItemButton>
      {selectedWorkspace && (
        <WorkspaceMenu
          anchorEl={anchorEl}
          options={workspaces}
          selectedOption={selectedWorkspace}
          setSelectedOption={setSelectedWorkspace}
          handleClose={handleClose}
        />
      )}
    </List>
  );
}
