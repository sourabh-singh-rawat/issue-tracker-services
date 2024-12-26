import { Grid2, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../../../common";

export const Home = () => {
  const current = useAppSelector((x) => x.auth.current);

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
