import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";

import MuiDivider from "@mui/material/Divider";
import MuiLockTwoToneIcon from "@mui/icons-material/LockTwoTone";

import Avatar from "../../../../common/components/Avatar";
import MenuItem from "../../../../common/components/MenuItem";

import StyledMenu from "../../../../common/components/styled/StyledMenu";
import { useMessageBar } from "../../../message-bar/hooks";
import StyledIconButton from "../../../../common/components/styled/StyledIconButton/StyledIconButton";
import StyledList from "../../../../common/components/styled/StyledList";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth.slice";

export default function AccountSwitcher() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { showSuccess } = useMessageBar();
  const [revokeTokens, { isSuccess }] = useState();
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const currentUser = useAppSelector((store) => store.auth.currentUser);

  useEffect(() => {
    if (isSuccess) showSuccess("Logged out");
  }, [isSuccess]);

  return (
    <>
      <StyledIconButton onClick={handleClick} disableRipple>
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
            onClick={() => {
              navigate("/me");
              handleClose();
            }}
          />
        </StyledList>
        <MuiDivider />
        <StyledList disablePadding>
          <MenuItem
            avatarIcon={<MuiLockTwoToneIcon />}
            label="Logout"
            onClick={async () => {
              await revokeTokens();
              dispatch(apiSlice.util.resetApiState());
              dispatch(logout());
              handleClose();
            }}
          />
        </StyledList>
      </StyledMenu>
    </>
  );
}
