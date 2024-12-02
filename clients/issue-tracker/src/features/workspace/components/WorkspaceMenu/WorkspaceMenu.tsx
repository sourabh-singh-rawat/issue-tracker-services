import React, { useState } from "react";

import WorkspaceModal from "../CreateWorkspaceModal";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";

import { useNavigate } from "react-router-dom";
import { MenuItem } from "../../../../common/enums/menu-item";
import WorkspaceListItem from "../WorkspaceListItem";
import { Workspace } from "../../../../api/codegen/gql/graphql";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";

interface WorkspaceMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  selectedOption: Workspace;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<Workspace | undefined>
  >;
  options?: Workspace[];
}

export default function WorkspaceMenu({
  anchorEl,
  handleClose,
  options = [],
  selectedOption,
  setSelectedOption,
}: WorkspaceMenuProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const workspaceId = selectedOption?.id;

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
            <ListItem onClick={onClick} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {options.length > 0 && (
          <List disablePadding>
            {options.map((option) => (
              <WorkspaceListItem
                key={option?.id}
                isOpen={open}
                option={option}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                handleClose={handleClose}
              />
            ))}
          </List>
        )}
      </Menu>
      <WorkspaceModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
