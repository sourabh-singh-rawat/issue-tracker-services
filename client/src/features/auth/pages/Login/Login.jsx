/* eslint-disable import/named */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Container, Typography } from '@mui/material';
import MuiGrid from '@mui/material/Grid';
import GoogleIcon from '@mui/icons-material/Google';

import continueWithGoogle from '../../../../utils/firebase/continue-with-google.utils';
import { onAuthStateChangedListener } from '../../../../config/firebase.config';

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const inviteToken = searchParams.get('inviteToken');

  const handleContinueWithGoogle = async () => {
    await continueWithGoogle(inviteToken);
  };

  // If the user is already loggen in, redirect to the dashboard
  useEffect(
    () =>
      onAuthStateChangedListener((user) => {
        if (user) navigate('/');
      }),
    [],
  );

  return (
    <Container component="main" maxWidth="xs">
      <MuiGrid spacing={2} container>
        <MuiGrid sx={{ textAlign: 'center', marginTop: 8 }} xs={12} item>
          <Typography fontWeight="bold" variant="h4">
            Log In
          </Typography>
        </MuiGrid>
        <MuiGrid xs={12} item>
          <Button
            startIcon={<GoogleIcon />}
            sx={{
              color: 'text.primary',
              textTransform: 'none',
            }}
            variant="outlined"
            fullWidth
            onClick={handleContinueWithGoogle}
          >
            Continue with Google
          </Button>
        </MuiGrid>
      </MuiGrid>
    </Container>
  );
}

export default Login;
