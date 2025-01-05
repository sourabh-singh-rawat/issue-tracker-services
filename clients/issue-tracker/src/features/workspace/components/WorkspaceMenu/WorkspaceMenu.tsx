import React, { useState } from "react";

import WorkspaceModal from "../CreateWorkspaceModal";

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { AddOutlined } from "@mui/icons-material";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Workspace } from "../../../../api/codegen/gql/graphql";

interface WorkspaceMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  selectedOption: Workspace;
  options?: Workspace[];
}

interface MenuItemAlt {
  icon: React.ReactElement;
  text: string;
  to?: string;
  onClick?: () => void;
}

export const WorkspaceMenu = ({
  anchorEl,
  handleClose,
  selectedOption,
}: WorkspaceMenuProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const workspaceId = selectedOption.id;

  const menuItems: MenuItemAlt[] = [
    {
      icon: <SettingsOutlinedIcon fontSize="small" />,
      text: "Settings",
      to: `/workspaces/${workspaceId}/settings`,
    },
    {
      icon: <PeopleAltOutlinedIcon fontSize="small" />,
      text: "Members",
      to: `/workspaces/${workspaceId}/members`,
    },
  ];

  const workspaceActions: MenuItemAlt[] = [
    {
      icon: <AddOutlined fontSize="small" />,
      text: "New Workspace",
      onClick: () => {
        setOpen(true);
        handleClose();
      },
    },
    { icon: <LoopOutlinedIcon fontSize="small" />, text: "Switch workspace" },
  ];

  return (
    <>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuItems.map(({ text, to, icon }) => (
          <MenuItem
            key={to}
            onClick={() => {
              if (to) navigate(to);
              handleClose();
            }}
            dense
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </MenuItem>
        ))}
        <Divider />
        {workspaceActions.map(({ text, icon, onClick }) => (
          <MenuItem key={text} onClick={onClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </MenuItem>
        ))}
      </Menu>
      <WorkspaceModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
};
