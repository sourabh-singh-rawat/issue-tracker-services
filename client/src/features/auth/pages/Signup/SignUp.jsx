import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";

import GoogleIcon from "@mui/icons-material/Google";

import { continueWithGoogle } from "../../../../utils/firebase.utils";
import { onAuthStateChangedListener } from "../../../../app/firebase.config";

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("inviteToken");
  const loggedInUser = localStorage.getItem("loggedInUser");

  const handleContinueWithGoogle = async () => {
    await continueWithGoogle(inviteToken);
  };

  useEffect(() => {
    return onAuthStateChangedListener((user) => {
      if (loggedInUser || user) navigate("/");
    });
  }, [loggedInUser]);

  return (
    <MuiContainer component="main" maxWidth="xs">
      <MuiGrid container spacing={2}>
        <MuiGrid item xs={12}>
          <MuiBox sx={{ marginTop: 8 }}>
            <MuiTypography variant="h4" fontWeight="bold">
              Sign up
            </MuiTypography>
            <MuiTypography variant="body2">
              Create an account & help yourself track issues efficiently.
            </MuiTypography>
          </MuiBox>
        </MuiGrid>
        <MuiGrid item xs={12}>
          <MuiButton
            variant="outlined"
            onClick={handleContinueWithGoogle}
            startIcon={<GoogleIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
            fullWidth
          >
            Continue with Google
          </MuiButton>
        </MuiGrid>
        {/* <MuiGrid item xs={12}>
          <MuiDivider>
            <MuiTypography variant="body2" sx={{ color: "text.primary" }}>
              Or sign up with your email
            </MuiTypography>
          </MuiDivider>
        </MuiGrid> */}
        {/* Signup form */}
        {/* <MuiGrid item xs={12}>
          <MuiBox component="form" onSubmit={handleSubmit}>
            <MuiGrid container>
              <MuiGrid item xs={12}>
                <TextField
                  title="Name"
                  name="name"
                  type="text"
                  placeholder="your name"
                  onChange={handleChange}
                />
              </MuiGrid>
              <MuiGrid item xs={12}>
                <TextField
                  title="Email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                />
              </MuiGrid>
              <MuiGrid item xs={12}>
                <TextField
                  title="Password"
                  name="Password"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                />
              </MuiGrid>
              <MuiButton
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  textTransform: "none",
                  margin: "1em 0",
                  fontWeight: 600,
                }}
              >
                Create an account
              </MuiButton>
            </MuiGrid>
            <MuiGrid container>
              <MuiGrid item>
                <MuiTypography variant="body2">
                  <Link to="/signin">Already have an account? Sign In</Link>
                </MuiTypography>
              </MuiGrid>
            </MuiGrid>
          </MuiBox>
        </MuiGrid> */}
      </MuiGrid>
    </MuiContainer>
  );
};

export default SignUp;
