import { LoginForm } from "../../components/LoginForm";

import { Container, Grid2, Typography, useTheme } from "@mui/material";
import { Link } from "../../../../common/components/base";

export const LoginPage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xs" sx={{ pt: theme.spacing(4) }}>
      <Grid2 container rowSpacing={2}>
        <Grid2 size={12}>
          <Typography variant="h1">Login</Typography>
          <Typography variant="body1">
            Don't have an account? <Link to="/signup">Create an Account</Link>
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <LoginForm />
        </Grid2>
      </Grid2>
    </Container>
  );
};
