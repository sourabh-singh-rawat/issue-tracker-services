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
  const navigate = useNavigate();
  const currentUser = useAppSelector((store) => store.auth.currentUser);

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
