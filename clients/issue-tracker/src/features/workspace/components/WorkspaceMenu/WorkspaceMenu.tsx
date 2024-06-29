import React, { useState } from "react";

import WorkspaceModal from "../CreateWorkspaceModal";

import Menu from "@mui/material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";

import MemberModal from "../MemberModal";
import StyledList from "../../../../common/components/styled/StyledList";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "../../../../common/enums/menu-item";
import WorkspaceListItem from "../WorkspaceListItem";
import { GetWorkspaceApiResponse } from "../../../../api/generated/workspace.api";

interface WorkspaceMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  selectedOption: GetWorkspaceApiResponse["rows"];
  setSelectedOption: React.Dispatch<
    React.SetStateAction<GetWorkspaceApiResponse["rows"]>
  >;
  options?: GetWorkspaceApiResponse["rows"][];
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
  const [openMember, setOpenMember] = useState(false);
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
        <List>
          {menuItems.map(({ text, to, icon }) => (
            <ListItem
              onClick={() => {
                if (to) navigate(to);
                handleClose();
              }}
            >
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {workspaceActions.map(({ text, icon, onClick }) => (
            <ListItem onClick={onClick}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {options.length > 0 && (
          <StyledList disablePadding>
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
          </StyledList>
        )}
      </Menu>
      <MemberModal open={openMember} handleClose={() => setOpenMember(false)} />
      <WorkspaceModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
