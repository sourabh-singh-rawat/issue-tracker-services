import React, { useState } from "react";

import MuiDivider from "@mui/material/Divider";

import WorkspaceModal from "../WorkspaceModal";
import WorkspaceListItem from "../WorkspaceListItem";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import MenuItem from "../../../../common/components/MenuItem";
import StyledMenu from "../../../../common/components/styled/StyledMenu";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import MemberModal from "../MemberModal";
import PersonAddAlt1TwoToneIcon from "@mui/icons-material/PersonAddAlt1TwoTone";
import StyledList from "../../../../common/components/styled/StyledList";

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
            label="Create workspace"
            onClick={() => {
              setOpen(true);
              handleClose();
            }}
          />
          <MenuItem
            label="Invite Members"
            onClick={() => {
              setOpenMember(true);
              handleClose();
            }}
            avatarIcon={<PersonAddAlt1TwoToneIcon />}
          />
          <MenuItem
            label="Settings"
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
