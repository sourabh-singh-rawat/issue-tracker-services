import React, { useState } from "react";

import WorkspaceModal from "../CreateWorkspaceModal";

import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { AddOutlined } from "@mui/icons-material";
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import type { WorkspaceObject } from "@generated/gql/graphql";

interface WorkspaceMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  selectedOption: WorkspaceObject;
  options?: WorkspaceObject[];
}

interface MenuItemAlt {
  icon: React.ReactElement;
  text: string;
  to?: string;
  onClick?: () => void;
}

export const WorkspaceMenu = ({ anchorEl, handleClose, selectedOption }: WorkspaceMenuProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const workspaceId = selectedOption.id ?? "";

  const menuItems = [
    {
      icon: <SettingsOutlinedIcon fontSize="small" />,
      text: "Settings",
      onClick: () => {
        if (!workspaceId) return;
        void navigate({ to: "/workspaces/$id/settings", params: { id: workspaceId } });
        handleClose();
      },
    },
    {
      icon: <PeopleAltOutlinedIcon fontSize="small" />,
      text: "Members",
      onClick: () => {
        if (!workspaceId) return;
        void navigate({ to: "/workspaces/$id/members", params: { id: workspaceId } });
        handleClose();
      },
    },
  ] as const;

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
        {menuItems.map(({ text, icon, onClick }) => (
          <MenuItem key={text} onClick={onClick} dense>
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
