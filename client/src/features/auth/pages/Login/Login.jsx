/* eslint-disable import/named */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import MuiButton from '@mui/material/Button';
import MuiContainer from '@mui/material/Container';
import MuiGoogleIcon from '@mui/icons-material/Google';
import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';

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
    <MuiContainer component="main" maxWidth="xs">
      <MuiGrid spacing={2} container>
        <MuiGrid sx={{ textAlign: 'center', marginTop: 8 }} xs={12} item>
          <MuiTypography fontWeight="bold" variant="h4">
            Log In
          </MuiTypography>
        </MuiGrid>
        <MuiGrid xs={12} item>
          <MuiButton
            startIcon={<MuiGoogleIcon />}
            sx={{
              color: 'text.primary',
              textTransform: 'none',
            }}
            variant="outlined"
            fullWidth
            onClick={handleContinueWithGoogle}
          >
            Continue with Google
          </MuiButton>
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

export default Login;
