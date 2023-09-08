import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../../../common/hooks";

import MuiDivider from "@mui/material/Divider";
import MuiIconButton from "@mui/material/IconButton";
import Avatar from "../../../../common/components/Avatar";
import { StyledMenu } from "../../../workspace/components/WorkspaceSwitcher/WorkspaceSwitcher";
import MenuItem from "../../../../common/components/MenuItem";
import MuiLogoutIcon from "@mui/icons-material/Logout";

const StyledIconButton = styled(MuiIconButton)(({ theme }) => ({
  ":hover": {
    backgroundColor: theme.palette.grey[700],
  },
}));

export default function AccountSwitcher() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const auth = useAppSelector((store) => store.auth);

  const handleClickIconButton = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <StyledIconButton onClick={handleClickIconButton} disableRipple>
        <Avatar label={auth.currentUser?.displayName[0]} />
      </StyledIconButton>
      <StyledMenu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          avatarIcon={<MuiLogoutIcon />}
          item={{ label: "Profile", value: "profile" }}
          onClick={() => handleClose()}
        />
        <MuiDivider />
        <MenuItem
          avatarIcon={<MuiLogoutIcon />}
          item={{ label: "Logout", value: "logout" }}
          onClick={() => handleClose()}
        />
      </StyledMenu>
    </>
  );
}
