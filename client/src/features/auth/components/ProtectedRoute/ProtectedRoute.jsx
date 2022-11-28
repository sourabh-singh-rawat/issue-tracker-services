import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { onAuthStateChangedListener } from "../../../../configs/firebase/firebase.config";

import MuiGrid from "@mui/material/Grid";
import MuiLinearProgress from "@mui/material/LinearProgress";

import { setCredentials } from "../../auth.slice";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const auth = useSelector((store) => store.auth);
  const token = useSelector((store) => store.auth.accessToken);

  // Once the user is authenticated with firebase
  // and accessToken is stored in the redux store
  // We can set the loggedInUser prop of localStorage to true
  // This will make sure that our app's ProtectedRoute component
  // will not redirect the user to the login page
  if (token) window.localStorage.setItem("loggedInUser", true);

  useEffect(() => {
    return onAuthStateChangedListener((user) => {
      if (user) {
        const {
          uid,
          email,
          displayName,
          accessToken,
          photoURL,
          stsTokenManager: { refreshToken },
        } = user;

        dispatch(
          setCredentials({
            user: { uid, email, displayName, photoURL },
            accessToken,
            refreshToken,
            isLoading: false,
          })
        );
      }
    });
  }, []);

  return window.localStorage.getItem("loggedInUser") ? (
    <Fragment>
      {auth.isLoading ? (
        <MuiGrid container>
          <MuiGrid item xs={12}>
            <MuiLinearProgress />
          </MuiGrid>
        </MuiGrid>
      ) : (
        <Outlet />
      )}
    </Fragment>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
