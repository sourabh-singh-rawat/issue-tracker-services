import MuiLockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../../common";
import Avatar from "../../../../common/components/Avatar";
import MenuItem from "../../../../common/components/MenuItem";
import StyledList from "../../../../common/components/styled/StyledList";

export function AccountSwitcher() {
  const navigate = useNavigate();
  const { current, isLoading } = useAppSelector((x) => x.auth);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton size="small" onClick={handleClick} disableRipple>
        <Avatar label={current?.displayName} isLoading={isLoading} />
      </IconButton>
      {current && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <List>
            <ListItem
              onClick={() => {
                navigate("/me");
                handleClose();
              }}
            >
              <ListItemIcon>
                <Avatar label={current.displayName} />
              </ListItemIcon>
              <ListItemText>{current.displayName}</ListItemText>
            </ListItem>
          </List>
          <Divider />
          <StyledList disablePadding>
            <MenuItem
              avatarIcon={<MuiLockTwoToneIcon />}
              label="Logout"
              onClick={async () => {
                handleClose();
              }}
            />
          </StyledList>
        </Menu>
      )}
    </>
  );
}
