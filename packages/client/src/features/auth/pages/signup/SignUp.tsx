import React from "react";
import SignUpForm from "../../components/SignUpForm";

import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";

export default function SignUp() {
  return (
    <MuiContainer maxWidth="md">
      <MuiGrid container>
        <MuiGrid item xs={6}>
          <SignUpForm />
        </MuiGrid>
        <MuiGrid item xs={6}></MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}
