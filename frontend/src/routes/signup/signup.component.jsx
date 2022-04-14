import { useState } from "react";
import { Link } from "react-router-dom";

// Authentication
import { continueWithGoogle } from "../../utils/firebase.utils";

// MUI Styles
import {
  Box,
  Grid,
  Button,
  Divider,
  Container,
  TextField,
  Typography,
} from "@mui/material";

// Auth helper functions
const continueWithGoogleHandler = async () => {
  await continueWithGoogle();

  // Store userCredential into context or redux store
  // TODO
};

const SignUp = () => {
  // Storing user information from form into state
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Signup user using firebase
    // TODO: Store user info inside database
    console.log(formFields);
  };

  // Every time user writes something in TextFields update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    // store value in state
    setFormFields({ ...formFields, [name]: value });
  };

  // Form  Component
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Sign Up
        </Typography>

        <Typography variant="body1" paddingBottom="1em">
          Create an account & help your organization track issues efficiently.
        </Typography>
      </Box>

      <Divider></Divider>

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

      {/* Signup form */}
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email Address"
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
              margin="normal"
              fullWidth
              required
            />
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
    </Container>
  );
};

export default SignUp;
