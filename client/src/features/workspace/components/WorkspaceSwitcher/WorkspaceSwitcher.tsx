import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material";

import MuiList from "@mui/material/List";
import MuiMenu from "@mui/material/Menu";
import MuiDivider from "@mui/material/Divider";
import MuiListButtonItem from "@mui/material/ListItemButton";
import MuiAddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MuiSettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MuiUnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import MenuItemContent from "../../../../common/components/MenuItemContent";
import MenuItem from "../../../../common/components/MenuItem";
import Avatar from "../../../../common/components/Avatar";
import AppLoader from "../../../../common/components/AppLoader";

const StyledList = styled(MuiList)(({ theme }) => ({
  ".MuiButtonBase-root": {
    borderRadius: theme.shape.borderRadiusMedium,
    backgroundColor: theme.palette.text.primary,
  },
  ".MuiButtonBase-root:hover": {
    backgroundColor: theme.palette.grey[700],
  },
}));

export const StyledMenu = styled(MuiMenu)(({ theme }) => ({
  marginTop: 5,
  ".MuiPaper-root": {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadiusMedium,
    boxShadow: theme.shadows[5],
  },
  ".MuiPopover-paper": {
    transition: "none !important",
  },
}));

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
      <StyledList disablePadding>
        <MuiListButtonItem
          onClick={handleClickListItem}
          sx={{
            paddingRight: 1,
            paddingLeft: 1,
            borderRadius: theme.shape.borderRadiusMedium,
            backgroundColor: theme.palette.grey[100],
          }}
          disableRipple
          disableGutters
        >
          <MenuItemContent
            avatarIcon={
              <Avatar
                photoUrl={selectedOption?.label}
                label={selectedOption?.label}
                variant="rounded"
              />
            }
            label={selectedOption?.label}
            indicatorIcon={<MuiUnfoldMoreIcon />}
          />
        </MuiListButtonItem>
      </StyledList>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            avatarIcon={
              <Avatar
                photoUrl={selectedOption?.label}
                label={selectedOption?.label}
                variant="rounded"
              />
            }
            item={option}
            selectedOption={selectedOption}
            onClick={() => {
              setSelectedOption(option);
              handleClose();
            }}
          />
        ))}
        <AppLoader />
        <MuiDivider />
        <MenuItem
          avatarIcon={<MuiAddBoxOutlinedIcon />}
          item={{ label: "Add new workspace" }}
          selectedOption={selectedOption}
          onClick={() => handleClose()}
        />
        <MenuItem
          avatarIcon={<MuiSettingsOutlinedIcon />}
          item={{ label: "Manage workspaces" }}
          selectedOption={selectedOption}
          onClick={() => {
            handleClose();
          }}
        />
      </StyledMenu>
    </>
  );
}
