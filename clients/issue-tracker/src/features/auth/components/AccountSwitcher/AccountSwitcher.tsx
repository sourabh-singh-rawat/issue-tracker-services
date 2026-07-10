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
import { useNavigate } from "@tanstack/react-router";

import { Logout } from "@mui/icons-material";
import { useLogoutMutation } from "@generated/gql";
import Avatar from "../../../../common/components/Avatar";
import { useAuthStore } from "../../store";

export const AccountSwitcher = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const current = useAuthStore((s) => s.current);
  const isLoading = useAuthStore((s) => s.isLoading);
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { mutateAsync: logout } = useLogoutMutation();

  const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleLogout = async () => {
    await logout({});
    setCurrentUser({ current: null });
    navigate({ to: "/login" });
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
              navigate({ to: "/me" });
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
