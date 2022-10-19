import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import TextField from "../../../../common/TextField";
import GoogleIcon from "@mui/icons-material/Google";

import {
  continueWithGoogle,
  signOutUser,
  signUpWithEmailAndPassword,
} from "../../../../utils/firebase.utils";

import { onAuthStateChangedListener } from "../../../../app/services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("inviteToken");

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
      navigate("/");
    } catch (error) {
      console.log("error");
    }
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
      if (user) {
        // user already signed in
        navigate("/");
      }
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ marginTop: 8 }}>
            <Typography variant="h4" fontWeight="bold">
              Sign In
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
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
          </Button>
        </Grid>
        {/* <Grid item xs={12}>
          <Divider>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              Or
            </Typography>
          </Divider>
        </Grid> */}
        {/* Signup form */}
        {/* <Grid item xs={12}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container gap="20px">
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
                  margin: "1em 0",
                  fontWeight: 600,
                  textTransform: "none",
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid container>
              <Grid item>
                <Typography variant="body2">
                  <Link to="/signin">Don't have an account? Sign Up</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default Login;