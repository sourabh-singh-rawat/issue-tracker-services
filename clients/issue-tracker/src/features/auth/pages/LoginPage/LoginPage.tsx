import { Link } from "react-router-dom";

import MuiContainer from "@mui/material/Container";
import { LoginForm } from "../../components/LoginForm";

import { Grid2, useTheme } from "@mui/material";
import { useAppSelector } from "../../../../common";

export const LoginPage = () => {
  const theme = useTheme();
  const x = useAppSelector((x) => x.auth);

  return (
    <MuiContainer maxWidth="md">
      <Grid2 container>
        <Grid2 size={6}>
          <LoginForm />
        </Grid2>
        <Grid2 size={6}></Grid2>
        <Grid2 size={6} sx={{ px: theme.spacing(3), pt: theme.spacing(1) }}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </Grid2>
      </Grid2>
    </MuiContainer>
  );
};
