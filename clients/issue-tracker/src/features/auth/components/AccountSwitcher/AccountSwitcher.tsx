import MuiLockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import {
  Avatar,
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

import MenuItem from "../../../../common/components/MenuItem";
import StyledList from "../../../../common/components/styled/StyledList";
import { useAuth } from "../../../../common/contexts/Auth";

export function AccountSwitcher() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const { auth } = useAuth();

  return (
    auth.user && (
      <>
        <IconButton size="small" onClick={handleClick} disableRipple>
          <Avatar variant="circular">
            {auth.user.displayName ? auth.user.displayName[0] : null}
          </Avatar>
        </IconButton>

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
                <Avatar>
                  {auth.user.displayName ? auth.user.displayName[0] : null}
                </Avatar>
              </ListItemIcon>
              <ListItemText>{auth.user.displayName}</ListItemText>
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
      </>
    )
  );
}
