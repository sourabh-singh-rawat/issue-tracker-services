import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import LoginForm from "../../components/LoginForm";

import { useTheme } from "@mui/material";
import { useAuth } from "../../../../common/contexts/Auth";

export default function Login() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (auth.user) navigate("/");
  }, [auth.user]);

  return (
    <MuiContainer maxWidth="md">
      <MuiGrid container>
        <MuiGrid item xs={6}>
          <LoginForm />
        </MuiGrid>
        <MuiGrid item xs={6}></MuiGrid>
        <MuiGrid
          item
          xs={6}
          sx={{ px: theme.spacing(3), pt: theme.spacing(1) }}
        >
          Don't have an account? <Link to="/signup">Sign up</Link>
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}
