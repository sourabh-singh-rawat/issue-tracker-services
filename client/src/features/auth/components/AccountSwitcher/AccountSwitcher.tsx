import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../common/hooks";

import MuiDivider from "@mui/material/Divider";
import MuiLockTwoToneIcon from "@mui/icons-material/LockTwoTone";

import Avatar from "../../../../common/components/Avatar";
import MenuItem from "../../../../common/components/MenuItem";

import StyledMenu from "../../../../common/components/styled/StyledMenu";
import { useRevokeTokensMutation } from "../../../../api/generated/identity.api";
import { useMessageBar } from "../../../message-bar/hooks";
import StyledIconButton from "../../../../common/components/styled/StyledIconButton/StyledIconButton";
import StyledList from "../../../../common/components/styled/StyledList";

export default function AccountSwitcher() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { showSuccess } = useMessageBar();
  const [revokeTokens, { isSuccess }] = useRevokeTokensMutation();

  const currentUser = useAppSelector((store) => store.auth.currentUser);

  const handleClickAccountIcon = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Logged out");
    }
  }, [isSuccess]);

  return (
    <>
      <StyledIconButton onClick={handleClickAccountIcon} disableRipple>
        <Avatar variant="circular" label={currentUser?.displayName} />
      </StyledIconButton>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <StyledList disablePadding>
          <MenuItem
            avatarIcon={<Avatar label={currentUser?.displayName} />}
            label={currentUser?.displayName}
          />
        </StyledList>
        <MuiDivider />
        <StyledList disablePadding>
          <MenuItem
            avatarIcon={<MuiLockTwoToneIcon />}
            label="Logout"
            onClick={async () => {
              await revokeTokens();
              handleClose();
            }}
          />
        </StyledList>
      </StyledMenu>
    </>
  );
}
