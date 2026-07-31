import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useForm } from "@tanstack/react-form";
import { useSearch } from "@tanstack/react-router";
import { useSignInWithEmailAndPasswordMutation } from "@generated/api/@tanstack/react-query.gen";
import { useSignInStore } from "@features/signin/stores";
import { Form, FormItem, getErrorMessage, PasswordInput, TextInput, useSnackbar } from "@shared/ui";

export const SignInForm = () => {
  useSignInStore();
  const snackbar = useSnackbar();

  const { login_challenge: loginChallenge } = useSearch({ from: "/(no-auth)/signin" });
  const signInMutation = useSignInWithEmailAndPasswordMutation();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      try {
        const result = await signInMutation.mutateAsync({
          body: { email: value.email, password: value.password },
          query: loginChallenge ? { login_challenge: loginChallenge } : undefined,
        });

        snackbar.success("Signed in successfully.");

        const redirectTo = result.data.redirectTo;
        if (redirectTo) {
          window.setTimeout(() => {
            window.location.assign(redirectTo);
          }, 600);
        }
      } catch (error) {
        snackbar.error(getErrorMessage(error, "Sign in failed. Please try again."));
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" component="h1" gutterBottom>
            Sign in
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your account. Enter your email and password to continue.
          </Typography>
        </Box>

        <Form form={form}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <FormItem name="email">
                <TextInput label="Email" autoComplete="email" />
              </FormItem>
            </Grid>

            <Grid size={12}>
              <FormItem name="password">
                <PasswordInput label="Password" autoComplete="current-password" />
              </FormItem>
            </Grid>

            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={signInMutation.isPending}
              >
                {signInMutation.isPending ? "Signing in…" : "Sign in"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Stack>
    </Container>
  );
};
