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
import { useLogoutMutation } from "@generated/api/@tanstack/react-query.gen";
import Avatar from "../../../../shared/components/Avatar";
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
    void navigate({ to: "/login" });
  };

  const label = current?.displayName || current?.email;

  return (
    <>
      <IconButton size="small" onClick={handleClick} disableRipple>
        <Avatar label={label} isLoading={isLoading} />
      </IconButton>
      {current && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              void navigate({ to: "/me" });
              handleClose();
            }}
            dense
          >
            <ListItemIcon>
              <Avatar label={label} />
            </ListItemIcon>
            <Stack>
              <Typography sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
                {label}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
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
