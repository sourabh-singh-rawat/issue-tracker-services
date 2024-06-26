import React, { useEffect, useState } from "react";
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
import { useAppSelector } from "../../../../common/hooks";
import { GetWorkspaceApiResponse } from "../../../../api/generated/workspace.api";

export default function WorkspaceSwitcher() {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { workspaces, defaultWorkspace } = useAppSelector((s) => s.workspace);
  const { name } = defaultWorkspace;
  const [selectedOption, setSelectedOption] = useState<
    GetWorkspaceApiResponse["rows"]
  >({ id: "", name: "" });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (defaultWorkspace) setSelectedOption(defaultWorkspace);
  }, [defaultWorkspace]);

  return (
    <List>
      <ListItem>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <Avatar
              alt={"Default"}
              sx={{
                height: 24,
                width: 24,
                bgcolor: theme.palette.primary.main,
              }}
            >
              <Typography>{name && name[0]}</Typography>
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={name} />
          <ListItemIcon>
            {anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      {selectedOption && (
        <WorkspaceMenu
          anchorEl={anchorEl}
          options={workspaces}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handleClose={handleClose}
        />
      )}
    </List>
  );
}
