/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import MuiGrid from '@mui/material/Grid';
import MuiContainer from '@mui/material/Container';
import MuiTypography from '@mui/material/Typography';

import continueWithGoogle from '../../../../utils/firebase/continue-with-google.utils';
import { onAuthStateChangedListener } from '../../../../config/firebase.config';
import { setCredentials } from '../../auth.slice';
import handleRedirectedAuth from '../../../../utils/firebase/handle-redirect.firebase.util';
import GoogleButton from '../../../../common/GoogleButton/GoogleButton';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('inviteToken');

  const handleContinueWithGoogle = async () => {
    await continueWithGoogle(inviteToken);
  };

  useEffect(() => {
    (async () => {
      const authenticatedUser = await handleRedirectedAuth();
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
        return navigate('/', { replace: true });
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
    <MuiContainer maxWidth="xs">
      <MuiGrid rowSpacing={2} container>
        <MuiGrid sx={{ textAlign: 'center', marginTop: 8 }} xs={12} item>
          <MuiTypography fontWeight="600" variant="h4">
            Sign Up
          </MuiTypography>
        </MuiGrid>
        <MuiGrid xs={12} item>
          <GoogleButton
            message="Signup with Google"
            onClick={handleContinueWithGoogle}
          />
        </MuiGrid>
        <MuiGrid xs={12} item>
          <Divider>
            <MuiTypography variant="body2">or</MuiTypography>
          </Divider>
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

export default SignUp;
