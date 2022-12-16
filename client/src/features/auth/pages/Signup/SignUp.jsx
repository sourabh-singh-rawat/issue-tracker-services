import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MuiButton from "@mui/material/Button";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";

import GoogleIcon from "@mui/icons-material/Google";

import { continueWithGoogle } from "../../../../utils/firebase/continue-with-google.utils";
import { onAuthStateChangedListener } from "../../../../config/firebase.config";

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
