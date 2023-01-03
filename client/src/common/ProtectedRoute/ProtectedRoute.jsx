/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import { CircularProgress } from '@mui/material';
import { onAuthStateChangedListener } from '../../config/firebase.config';
import { setCredentials } from '../../features/auth/auth.slice';

function ProtectedRoutes() {
  const location = useLocation();
  const dispatch = useDispatch();

  const auth = useSelector((store) => store.auth);
  const accessToken = useSelector((store) => store.auth.accessToken);

  // Once the user is authenticated with firebase
  // and accessToken is stored in the redux store
  // We can set the loggedInUser prop of localStorage to true
  // This will make sure that our app's ProtectedRoute component
  // will not redirect the user to the login page

  useEffect(() => {
    onAuthStateChangedListener((user) => {
      if (user) {
        localStorage.setItem('loggedInUser', true);
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
      }
    });
  }, []);

  return localStorage.getItem('loggedInUser') ? (
    <>
      {auth.isLoading ? (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : (
        accessToken && <Outlet />
      )}
    </>
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
}

export default ProtectedRoutes;
