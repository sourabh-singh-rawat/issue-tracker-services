import { Container, Grid2 } from "@mui/material";
import { SignUpForm } from "../../components";

export const SignUpPage = () => {
  return (
    <Container maxWidth="md">
      <Grid2 container>
        <Grid2 size={6}>
          <SignUpForm />
        </Grid2>
        <Grid2 size={6}></Grid2>
      </Grid2>
    </Container>
  );
};
