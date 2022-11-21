import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MuiButton from "@mui/material/Button";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";

import GoogleIcon from "@mui/icons-material/Google";

import { continueWithGoogle } from "../../../../configs/firebase/utils/continue-with-google.utils";
import { onAuthStateChangedListener } from "../../../../configs/firebase/firebase.config";

const StyledButton = styled(MuiButton)(({ theme }) => {
  return {
    textTransform: "none",
    padding: "8px 16px",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    ":hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  };
});

const SignUp = () => {
  const theme = useTheme();
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
    <MuiGrid container height={"100vh"}>
      <MuiGrid item md={5} xs={12}>
        <MuiContainer maxWidth="xs">
          <MuiGrid container rowSpacing={4}>
            {/* Sign up title */}
            {/* <MuiGrid item xs={12}>
              <MuiGrid container sx={{ marginTop: 8 }} rowSpacing={1}>
                <MuiGrid item>
                  <MuiTypography variant="h3" fontWeight="bold">
                    Create Account
                  </MuiTypography>
                </MuiGrid>
                <MuiGrid item>
                  <MuiTypography variant="body2">
                    Create account & start creating projects to track issues.
                  </MuiTypography>
                </MuiGrid>
              </MuiGrid>
            </MuiGrid> */}
            {/* sign up with email */}
            {/* <MuiGrid item xs={12}>
              <MuiGrid container component="form" rowSpacing={2}>
                <MuiGrid item xs={12}>
                  <TextField
                    title="Name*"
                    name="displayName"
                    type="text"
                    required
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <TextField title="Email*" name="email" required />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <TextField
                    title="Password*"
                    name="password"
                    type="password"
                    helperText="password should atleast be 8 characters long"
                    required
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <StyledButton>
                    <MuiTypography variant="body2">
                      Create Account
                    </MuiTypography>
                  </StyledButton>
                </MuiGrid>
              </MuiGrid>
            </MuiGrid> */}
            {/* continue with google */}
            <MuiGrid item xs={12}>
              <Divider>
                <MuiTypography variant="body2">or</MuiTypography>
              </Divider>
            </MuiGrid>
            <MuiGrid item xs={12}>
              <MuiButton
                variant="outlined"
                onClick={handleContinueWithGoogle}
                startIcon={<GoogleIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                }}
                fullWidth
              >
                Create account with Google
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </MuiContainer>
      </MuiGrid>
      <MuiGrid
        md={7}
        xs={12}
        sx={{ backgroundColor: theme.palette.grey[100] }}
      ></MuiGrid>
    </MuiGrid>
  );
};

export default SignUp;
