/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import MuiContainer from '@mui/material/Container';
import MuiGrid from '@mui/material/Grid';
import MuiTypography from '@mui/material/Typography';

import continueWithGoogle from '../../../../utils/firebase/continue-with-google.utils';
import handleRedirectedAuth from '../../../../utils/firebase/handle-redirect.firebase.util';
import { setCredentials } from '../../auth.slice';
import { onAuthStateChangedListener } from '../../../../config/firebase.config';
import GoogleButton from '../../../../common/GoogleButton/GoogleButton';

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const inviteToken = searchParams.get('inviteToken');
  // eslint-disable-next-line no-console
  console.log('rendering login page');

  const handleContinueWithGoogle = () => {
    continueWithGoogle(inviteToken);
  };

  useEffect(() => {
    (async () => {
      const authenticatedUser = await handleRedirectedAuth();
      // eslint-disable-next-line no-console
      if (authenticatedUser) {
        const payload = {
          accessToken: authenticatedUser.accessToken,
          user: {
            uid: authenticatedUser.uid,
            displayName: authenticatedUser.displayName,
            email: authenticatedUser.email,
            photoURL: authenticatedUser.photoURL,
          },
        };
        dispatch(setCredentials(payload));
        if (authenticatedUser.accessToken) {
          window.localStorage.setItem('loggedInUser', true);
        }

        // redirect to dashboard
        return navigate('/');
      }
    })();
  }, []);

  // Always redirect to the dashboard if already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        console.log('user already authenticated');
        const payload = {
          accessToken: user.accessToken,
          user: {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          },
        };
        dispatch(setCredentials(payload));
        if (user.accessToken) {
          window.localStorage.setItem('loggedInUser', true);
        }
        // redirect to dashboard
        return navigate('/');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <MuiContainer component="main" maxWidth="xs">
      <MuiGrid spacing={2} container>
        <MuiGrid sx={{ textAlign: 'center', marginTop: 8 }} xs={12} item>
          <MuiTypography fontWeight="600" variant="h4">
            Log In
          </MuiTypography>
        </MuiGrid>
        <MuiGrid xs={12} item>
          <GoogleButton
            message="Login with Google"
            onClick={handleContinueWithGoogle}
          />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

export default Login;
