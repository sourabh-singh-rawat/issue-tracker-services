import React, { useState } from "react";
import { useAppSelector } from "../../../../common/hooks";

import MuiMenuList from "@mui/material/MenuList";
import MuiDivider from "@mui/material/Divider";
import MuiLockTwoToneIcon from "@mui/icons-material/LockTwoTone";

import Avatar from "../../../../common/components/Avatar";
import MenuItem from "../../../../common/components/MenuItem";

import StyledMenu from "../../../../common/components/styled/StyledMenu";

export default function AccountSwitcher() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const currentUser = useAppSelector((store) => store.auth.currentUser);

  const handleClickAccountIcon = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <MenuItem
        onClick={handleClickAccountIcon}
        avatarIcon={
          <Avatar variant="circular" label={currentUser?.displayName} />
        }
      />
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiMenuList dense disablePadding>
          <MenuItem
            avatarIcon={<Avatar label={currentUser?.displayName} />}
            label={currentUser?.displayName}
          />
          <MuiDivider />
          <MenuItem
            avatarIcon={<MuiLockTwoToneIcon />}
            label="Logout"
            onClick={handleClose}
          />
        </MuiMenuList>
      </StyledMenu>
    </>
  );
}
