import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import LoginForm from "../../components/LoginForm";
import { useAppSelector } from "../../../../common/hooks";

// import continueWithGoogle from "../../../../utils/firebase/continue-with-google.utils";
// import handleRedirectedAuth from "../../../../utils/firebase/handle-redirect.firebase.util";
// import { setCredentials } from "../../auth.slice";
// import { onAuthStateChangedListener } from "../../../../config/firebase.config";
// import GoogleButton from "../../../../common/GoogleButton/GoogleButton";

function Login() {
  const currentUser = useAppSelector((store) => store.auth.currentUser);
  const navigate = useNavigate();
  // const [searchParams] = useSearch/Params();
  // const dispatch = useDispatch();

  // const inviteToken = searchParams.get("inviteToken") || "token";
  // eslint-disable-next-line no-console
  console.log("rendering login page");

  // const handleContinueWithGoogle = () => {
  //   continueWithGoogle(inviteToken);
  // };

  // useEffect(() => {
  //   (async () => {
  //     const authenticatedUser = await handleRedirectedAuth();
  //     // eslint-disable-next-line no-console
  //     if (authenticatedUser) {
  //       const payload = {
  //         accessToken: authenticatedUser.accessToken,
  //         user: {
  //           uid: authenticatedUser.uid,
  //           displayName: authenticatedUser.displayName,
  //           email: authenticatedUser.email,
  //           photoURL: authenticatedUser.photoURL,
  //         },
  //       };
  //       dispatch(setCredentials(payload));
  //       if (authenticatedUser.accessToken) {
  //         window.localStorage.setItem("loggedInUser", true);
  //       }

  //       // redirect to dashboard
  //       return navigate("/");
  //     }
  //   })();
  // }, []);

  // Always redirect to the dashboard if already authenticated
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener(async (user) => {
  //     if (user) {
  //       console.log("user already authenticated");
  //       const payload = {
  //         accessToken: user.accessToken,
  //         user: {
  //           uid: user.uid,
  //           displayName: user.displayName,
  //           email: user.email,
  //           photoURL: user.photoURL,
  //         },
  //       };
  //       dispatch(setCredentials(payload));
  //       if (user.accessToken) {
  //         window.localStorage.setItem("loggedInUser", true);
  //       }
  //       // redirect to dashboard
  //       return navigate("/");
  //     }
  //   });

  // return unsubscribe;
  // }, []);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <MuiContainer maxWidth="md">
      <MuiGrid container>
        <MuiGrid item xs={6}>
          <LoginForm />
        </MuiGrid>
        <MuiGrid item xs={6}></MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

export default Login;
