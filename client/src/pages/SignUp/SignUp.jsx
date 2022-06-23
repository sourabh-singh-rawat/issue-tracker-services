import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
} from "../../utils/firebase.utils";
import {
  Box,
  Grid,
  Button,
  Divider,
  Container,
  Typography,
} from "@mui/material";
import StyledTextField from "../../components/StyledTextField/StyledTextField";
import GoogleIcon from "@mui/icons-material/Google";

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ marginTop: 8 }}>
            <Typography variant="h4" fontWeight="bold">
              Sign up
            </Typography>
            <Typography variant="body1">
              Create an account & help yourself track issues efficiently.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={continueWithGoogleHandler}
            startIcon={<GoogleIcon />}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
            }}
            fullWidth
          >
            Continue with Google
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Typography variant="body1" sx={{ color: "text.subtitle1" }}>
              Or sign up with your email
            </Typography>
          </Divider>
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
                  placeholder="yourname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  title="Email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  title="Password"
                  name="Password"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                />
              </Grid>
              <Button
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
              </Button>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography variant="body1">
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
