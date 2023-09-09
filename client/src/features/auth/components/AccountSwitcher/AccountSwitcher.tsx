import React, { useState } from "react";
import { useTheme } from "@mui/material";
import { useAppSelector } from "../../../../common/hooks";

import MuiList from "@mui/material/List";
import MuiDivider from "@mui/material/Divider";
import MuiLockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import MuiPersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";

import Avatar from "../../../../common/components/Avatar";
import MenuItem from "../../../../common/components/MenuItem";

import StyledMenu from "../../../../common/components/styled/StyledMenu";

export default function AccountSwitcher() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const auth = useAppSelector((store) => store.auth);

  const handleClickIconButton = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <MenuItem
        onClick={handleClickIconButton}
        avatarIcon={
          <Avatar variant="circular" label={auth.currentUser?.displayName[0]} />
        }
      />
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiList sx={{ p: theme.spacing(2) }} disablePadding>
          <MenuItem
            avatarIcon={<MuiPersonOutlineTwoToneIcon />}
            label="Profile"
            onClick={() => handleClose()}
          />
          <MuiDivider />
          <MenuItem
            avatarIcon={<MuiLockTwoToneIcon />}
            label="Logout"
            onClick={() => handleClose()}
          />
        </MuiList>
      </StyledMenu>
    </>
  );
}
