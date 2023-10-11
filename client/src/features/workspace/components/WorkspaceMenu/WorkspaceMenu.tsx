import React, { useState } from "react";

import MuiDivider from "@mui/material/Divider";

import MuiMenuList from "@mui/material/MenuList";
import WorkspaceModal from "../WorkspaceModal";
import WorkspaceListItem from "../WorkspaceListItem";

import AddIcon from "@mui/icons-material/Add";
import AppsIcon from "@mui/icons-material/Apps";

import MenuItem from "../../../../common/components/MenuItem";
import StyledMenu from "../../../../common/components/styled/StyledMenu";

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
  const handleModalClose = () => setOpen(false);

  return (
    <>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MuiMenuList dense disablePadding>
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
        </MuiMenuList>
        <MuiDivider />
        <MenuItem
          avatarIcon={<AddIcon />}
          label="Add new workspace"
          onClick={() => {
            setOpen(true);
            handleClose();
          }}
        />
        <MenuItem
          label="Manage workspaces"
          onClick={handleClose}
          avatarIcon={<AppsIcon />}
        />
      </StyledMenu>
      <WorkspaceModal open={open} handleClose={handleModalClose} />
    </>
  );
}
