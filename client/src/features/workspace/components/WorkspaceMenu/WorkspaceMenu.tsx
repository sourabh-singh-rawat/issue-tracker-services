import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import WorkspaceList from "../WorkspaceList";
import MuiMenu from "@mui/material/Menu";
import MuiDivider from "@mui/material/Divider";
import MenuItem from "../../../../common/components/MenuItem";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuList from "../../../../common/components/MenuList";
import WorkspaceModal from "../WorkspaceModal";

const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  ".MuiPaper-root": {
    boxShadow: theme.shadows[6],
    borderRadius: theme.shape.borderRadiusMedium,
  },
  ".MuiMenu-list": { padding: 0 },
}));

interface WorkspaceMenuProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  options: { name: string; id: string; createdAt: string }[];
  selectedOption: { id: string; name: string; createdAt: string } | undefined;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<{ name: string; id: string } | undefined>
  >;
}

export default function WorkspaceMenu({
  anchorEl,
  handleClose,
  options,
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
        <WorkspaceList
          options={options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isOpen={Boolean(anchorEl)}
          handleClose={handleClose}
        />
        <MuiDivider />
        <MenuList>
          <MenuItem
            avatarIcon={<AddBoxOutlinedIcon />}
            label="Add new workspace"
            onClick={() => {
              setOpen(true);
              handleClose();
            }}
          />
          <MenuItem
            label="Manage workspaces"
            onClick={handleClose}
            avatarIcon={<AddBoxOutlinedIcon />}
          />
        </MenuList>
      </StyledMenu>
      <WorkspaceModal open={open} handleClose={handleModalClose} />
    </>
  );
}
