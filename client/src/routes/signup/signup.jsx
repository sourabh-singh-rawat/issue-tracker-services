import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
} from "../../firebase/auth";
import {
  Box,
  Grid,
  Button,
  Divider,
  Container,
  Typography,
} from "@mui/material";
import StyledTextField from "../../components/StyledTextField/StyledTextField";

const SignUp = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formFields;
    try {
      const response = await signUpWithEmailAndPassword(email, password);
      const { user } = response;
      navigate("/");
    } catch (error) {
      console.log("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFormFields({ ...formFields, [name]: value });
  };

  const continueWithGoogleHandler = async () => {
    await signInWithGoogle();
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box sx={{ marginTop: 8 }}>
            <Typography variant="h4" fontWeight="bold">
              Sign Up
            </Typography>
            <Typography variant="body1">
              Create an account & help your organization track issues
              efficiently.
              <Link to="/">Dashboard</Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <Box sx={{ padding: "1em 0" }}>
            <Typography>Sign in using</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={continueWithGoogleHandler}
                  fullWidth
                  sx={{ textTransform: "none" }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ textTransform: "none" }}
                >
                  Github
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
                  title="Name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  title="Email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  title="Password"
                  name="Password"
                  type="password"
                  onChange={handleChange}
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
