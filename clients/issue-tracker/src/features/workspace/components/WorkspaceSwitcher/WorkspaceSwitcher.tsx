import React, { useState } from "react";

import { useAppSelector } from "../../../../common/hooks";
import { useGetAllWorkspacesQuery } from "../../../../api/generated/workspace.api";

import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import WorkspaceMenu from "../WorkspaceMenu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTheme } from "@mui/material";

export default function WorkspaceSwitcher() {
  const theme = useTheme();
  const { data: workspaces } = useGetAllWorkspacesQuery();
  const { id, name } = useAppSelector(({ auth }) => auth.currentWorkspace);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState({ id, name });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <List>
      <ListItem>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Avatar
              alt={name[0]}
              sx={{
                height: 24,
                width: 24,
                bgcolor: theme.palette.primary.main,
              }}
            >
              <Typography>{name[0]}</Typography>
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={name} />
          <ListItemIcon>
            {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <WorkspaceMenu
        anchorEl={anchorEl}
        options={workspaces?.rows}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        handleClose={handleClose}
      />
    </List>
  );
}
