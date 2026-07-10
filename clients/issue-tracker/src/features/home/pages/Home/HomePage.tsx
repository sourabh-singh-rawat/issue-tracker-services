import { Grid2, Typography } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { useAuthStore } from "@features/auth";

export const HomePage = () => {
  const current = useAuthStore((s) => s.current);

  return (
    <Grid2 container>
      {current && (
        <Grid2 size={12}>
          <Typography variant="h4" fontWeight="bold">
            Good evening, {current.displayName}
          </Typography>
        </Grid2>
      )}
      <Grid2 size={12}>
        <Outlet />
      </Grid2>
    </Grid2>
  );
};
