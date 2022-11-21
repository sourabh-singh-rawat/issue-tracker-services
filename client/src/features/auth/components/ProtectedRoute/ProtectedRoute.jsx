import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import { LinearProgress } from "@mui/material";

import { setCredentials } from "../../auth.slice";
import { onAuthStateChangedListener } from "../../../../configs/firebase/firebase.config";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((store) => store.auth);
  let token = useSelector((store) => store.auth.accessToken);
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
            <LinearProgress />{" "}
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
