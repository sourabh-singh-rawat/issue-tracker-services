import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { continueWithGoogle } from "../../../../configs/firebase/utils/continue-with-google.utils";
import { onAuthStateChangedListener } from "../../../../configs/firebase/firebase.config";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const inviteToken = searchParams.get("inviteToken");

  const handleContinueWithGoogle = async () => {
    await continueWithGoogle(inviteToken);
  };

  // If the user is already loggen in, redirect to the dashboard
  useEffect(() => {
    return onAuthStateChangedListener((user) => {
      if (user) navigate("/");
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: "center", marginTop: 8 }}>
          <Typography variant="h4" fontWeight="bold">
            Log In
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={handleContinueWithGoogle}
            startIcon={<GoogleIcon />}
            sx={{
              color: "text.primary",
              textTransform: "none",
            }}
            fullWidth
          >
            Continue with Google
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
