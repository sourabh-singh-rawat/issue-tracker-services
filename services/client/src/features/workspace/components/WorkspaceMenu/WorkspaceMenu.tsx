import React, { useState } from "react";

import MuiDivider from "@mui/material/Divider";

import WorkspaceModal from "../CreateWorkspaceModal";
import WorkspaceListItem from "../WorkspaceListItem";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import MenuItem from "../../../../common/components/MenuItem";
import StyledMenu from "../../../../common/components/styled/StyledMenu";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import MemberModal from "../MemberModal";
import PersonAddAlt1TwoToneIcon from "@mui/icons-material/PersonAddAlt1TwoTone";
import StyledList from "../../../../common/components/styled/StyledList";
import { useNavigate } from "react-router-dom";

interface WorkspaceMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  options?: { name: string; id: string; createdAt: string }[];
  selectedOption: { id: string; name: string };
  setSelectedOption: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
}

export default function WorkspaceMenu({
  anchorEl,
  handleClose,
  options = [],
  selectedOption,
  setSelectedOption,
}: WorkspaceMenuProps) {
  const [open, setOpen] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const navigate = useNavigate();

  const onClickOpenWorkspace = () => {
    setOpen(true);
    handleClose();
  };

  const onClickOpenWorkspaceMembers = () => {
    setOpenMember(true);
    handleClose();
  };

  return (
    <>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledList disablePadding>
          <MenuItem
            avatarIcon={<AddCircleIcon />}
            label="Create new Workspace"
            onClick={onClickOpenWorkspace}
          />
          <MenuItem
            label="Invite Members"
            onClick={onClickOpenWorkspaceMembers}
            avatarIcon={<PersonAddAlt1TwoToneIcon />}
          />
          <MenuItem
            label="Settings"
            onClick={() => {
              navigate("/workspaces");
              handleClose();
            }}
            avatarIcon={<SettingsTwoToneIcon />}
          />
          <MenuItem
            label="Manage Workspaces"
            onClick={handleClose}
            avatarIcon={<SettingsTwoToneIcon />}
          />
        </StyledList>
        <MuiDivider />
        {options.length > 0 && (
          <StyledList disablePadding>
            {options.map((option) => (
              <WorkspaceListItem
                key={option.id}
                isOpen={open}
                option={option}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                handleClose={handleClose}
              />
            ))}
          </StyledList>
        )}
      </StyledMenu>
      <MemberModal open={openMember} handleClose={() => setOpenMember(false)} />
      <WorkspaceModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
