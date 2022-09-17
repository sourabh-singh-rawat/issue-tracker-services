import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Box,
  Grid,
  Button,
  Divider,
  Container,
  Typography,
} from "@mui/material";
import TextField from "../../../../common/TextField";
import GoogleIcon from "@mui/icons-material/Google";

import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
} from "../../../../utils/firebase.utils";

import { onAuthStateChangedListener } from "../../../../app/services/auth.service";

const SignUp = () => {
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
    const { email, password } = formFields;

    try {
      const response = await signUpWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error) {
      console.log("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const continueWithGoogleHandler = async () => {
    await signInWithGoogle(inviteToken);
  };

  useEffect(() => {
    return onAuthStateChangedListener((user) => {
      if (user && !inviteToken) navigate("/");
    });
  }, []);

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
                <TextField
                  title="Name"
                  name="name"
                  type="text"
                  placeholder="yourname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  title="Email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
