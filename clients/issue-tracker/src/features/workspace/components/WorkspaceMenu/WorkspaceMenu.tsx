import React, { useState } from "react";

import WorkspaceModal from "../CreateWorkspaceModal";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Workspace } from "../../../../api/codegen/gql/graphql";
import { MenuItem } from "../../../../common/enums/menu-item";

interface WorkspaceMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  selectedOption: Workspace;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<Workspace | undefined>
  >;
  options?: Workspace[];
}

export default function WorkspaceMenu(
  {
    anchorEl,
    handleClose,
    selectedOption,
    setSelectedOption,
  }: WorkspaceMenuProps,
) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const workspaceId = selectedOption.id;

  const menuItems: MenuItem[] = [
    {
      icon: <SettingsOutlinedIcon />,
      text: "Settings",
      to: `/workspaces/${workspaceId}/settings`,
    },
    {
      icon: <PeopleAltOutlinedIcon />,
      text: "Members",
      to: `/workspaces/${workspaceId}/members`,
    },
  ];

  const workspaceActions: MenuItem[] = [
    {
      icon: <AddBoxOutlinedIcon />,
      text: "Create workspace",
      onClick: () => {
        setOpen(true);
        handleClose();
      },
    },
    { icon: <LoopOutlinedIcon />, text: "Switch workspace" },
  ];

  return (
    <>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <List disablePadding>
          {menuItems.map(({ text, to, icon }) => (
            <ListItem
              key={to}
              onClick={() => {
                if (to) navigate(to);
                handleClose();
              }}
              disableGutters
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List disablePadding>
          {workspaceActions.map(({ text, icon, onClick }) => (
            <ListItem key={text} onClick={onClick} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Menu>
      <WorkspaceModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
