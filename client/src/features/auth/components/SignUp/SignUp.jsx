import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiDivider from "@mui/material/Divider";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";

import TextField from "../../../../common/TextField";
import GoogleIcon from "@mui/icons-material/Google";

import {
  continueWithGoogle,
  signUpWithEmailAndPassword,
} from "../../../../utils/firebase.utils";

import { onAuthStateChangedListener } from "../../../../app/services/auth.service";

export default function SignUp() {
  const token = useSelector((store) => store.auth.token);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inviteToken = searchParams.get("inviteToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formFields;

    // try {
    const response = await signUpWithEmailAndPassword({
      name,
      email,
      password,
      inviteToken,
    });
    //   navigate("/");
    // } catch (error) {
    //   console.log("error");
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleContinueWithGoogle = async () => {
    await continueWithGoogle(inviteToken);
  };

  useEffect(() => {
    return onAuthStateChangedListener((user) => {
      if (user && !inviteToken) navigate("/");
    });
  }, []);

  return (
    <MuiContainer component="main" maxWidth="xs">
      <MuiGrid container spacing={2}>
        <MuiGrid item xs={12}>
          <MuiBox sx={{ marginTop: 8 }}>
            <MuiTypography variant="h4" fontWeight="bold">
              Sign up
            </MuiTypography>
            <MuiTypography variant="body1">
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
              fontWeight: "bold",
            }}
            fullWidth
          >
            Continue with Google
          </MuiButton>
        </MuiGrid>
        {/* <MuiGrid item xs={12}>
          <MuiDivider>
            <MuiTypography variant="body1" sx={{ color: "text.subtitle1" }}>
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
                  fontWeight: "bold",
                }}
              >
                Create an account
              </MuiButton>
            </MuiGrid>
            <MuiGrid container>
              <MuiGrid item>
                <MuiTypography variant="body1">
                  <Link to="/signin">Already have an account? Sign In</Link>
                </MuiTypography>
              </MuiGrid>
            </MuiGrid>
          </MuiBox>
        </MuiGrid> */}
      </MuiGrid>
    </MuiContainer>
  );
}
