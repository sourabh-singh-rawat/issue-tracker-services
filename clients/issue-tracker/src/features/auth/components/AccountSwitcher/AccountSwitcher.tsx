import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Logout } from "@mui/icons-material";
import { useLogoutMutation } from "../../../../api";
import { useAppDispatch, useAppSelector } from "../../../../common";
import Avatar from "../../../../common/components/Avatar";
import { setCurrentUser } from "../../auth.slice";

export const AccountSwitcher = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { current, isLoading } = useAppSelector((x) => x.auth);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [logout] = useLogoutMutation({
    onCompleted() {
      dispatch(setCurrentUser({ current: null }));
      navigate("/login");
    },
  });

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    await logout();
  };

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
        >
          <MenuItem
            onClick={() => {
              navigate("/me");
              handleClose();
            }}
            dense
          >
            <ListItemIcon>
              <Avatar label={current.displayName} />
            </ListItemIcon>
            <Stack>
              <Typography
                sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}
              >
                {current.displayName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                {current.email}
              </Typography>
            </Stack>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} dense>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      )}
    </>
  );
};
