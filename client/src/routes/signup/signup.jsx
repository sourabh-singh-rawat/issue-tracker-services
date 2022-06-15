import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  Divider,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import {
  continueWithGoogle,
  signUpWithEmailAndPassword,
} from "../../utils/firebase.utils";
import StyledTextField from "../../components/StyledTextField/StyledTextField";

const SignUp = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    name: "",
    owner_email: "",
    password: "",
    uid: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Sanitization
    const { name, email, password } = formFields;
    const userCredential = await signUpWithEmailAndPassword(
      name,
      email,
      password
    );
  };

  // Every time user writes something in TextFields update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const continueWithGoogleHandler = async () => {
    const userCredential = await continueWithGoogle();
    navigate("/");
  };

  // Form  Component
  return (
    <Container component="main" maxWidth="xs">
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ marginTop: 8 }}>
            <Typography variant="h4" fontWeight="bold">
              Sign Up
            </Typography>

            <Typography variant="body1" paddingBottom="1em">
              Create an account & help your organization track issues
              efficiently.
              <Link to="/">Dashboard</Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <Box sx={{ padding: "1em 0" }}>
            <Grid container>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={continueWithGoogleHandler}
                  fullWidth
                >
                  Continue with Google
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Divider>Or sign up with your email</Divider>
        </Grid>
        {/* Signup form */}
        <Grid item xs={12}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <StyledTextField
                  name="Name"
                  type="text"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  name="Email"
                  type="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField name="Password" type="password" />
              </Grid>
              <Button
                variant="contained"
                size="large"
                type="submit"
                fullWidth
                sx={{ margin: "1em 0" }}
              >
                Create an account
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  <Link to="/signin">Already have an account? Sign In</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
