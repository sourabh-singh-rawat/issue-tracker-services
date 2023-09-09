import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

import MuiList from "@mui/material/List";
import MuiDivider from "@mui/material/Divider";
import MuiAddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MuiSettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MuiUnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

import Avatar from "../../../../common/components/Avatar";
import MenuItem from "../../../../common/components/MenuItem";
import StyledMenu from "../../../../common/components/styled/StyledMenu";

const options = [
  { label: "Workspace 1", value: "workspace1" },
  { label: "Workspace 2", value: "workspace2" },
  { label: "Workspace 3", value: "workspace3" },
  { label: "Workspace 4", value: "workspace4" },
];

export default function WorkspaceSwitcher() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MenuItem
        onClick={handleClickListItem}
        avatarIcon={
          <Avatar
            variant="rounded"
            label={selectedOption?.label}
            photoUrl={selectedOption?.label}
          />
        }
        label={selectedOption?.label}
        indicatorIcon={<MuiUnfoldMoreIcon />}
      />
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MuiList sx={{ p: theme.spacing(2) }} disablePadding>
          {options.map((option) => (
            <MenuItem
              isMenuGroupOpen={open}
              key={option.value}
              avatarIcon={
                <Avatar
                  photoUrl={selectedOption?.label}
                  label={selectedOption?.label}
                  variant="rounded"
                />
              }
              label={option.label}
              onClick={() => {
                setSelectedOption(option);
                handleClose();
              }}
            />
          ))}
          <MuiDivider />
          <MenuItem
            avatarIcon={<MuiAddBoxOutlinedIcon />}
            label="Add new workspace"
            onClick={() => handleClose()}
          />
          <MenuItem
            avatarIcon={<MuiSettingsOutlinedIcon />}
            label="Manage workspaces"
            onClick={() => {
              handleClose();
            }}
          />
        </MuiList>
      </StyledMenu>
    </>
  );
}
