import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useForm } from "@tanstack/react-form";
import { useRegisterWithEmailAndPasswordMutation } from "@generated/api/@tanstack/react-query.gen";
import { useRegistrationStore } from "@features/registration/stores";
import { Form, FormItem, getErrorMessage, PasswordInput, TextInput, useSnackbar } from "@shared/ui";

export const RegistrationForm = () => {
  useRegistrationStore();
  const snackbar = useSnackbar();

  const registerMutation = useRegisterWithEmailAndPasswordMutation();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      try {
        await registerMutation.mutateAsync({
          body: { email: value.email, password: value.password },
        });
        snackbar.success("Account created. Check your email to verify your address.");
      } catch (error) {
        snackbar.error(getErrorMessage(error, "Registration failed. Please try again."));
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Form form={form}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <FormItem name="email">
              <TextInput label="Email" autoComplete="email" />
            </FormItem>
          </Grid>

          <Grid size={12}>
            <FormItem name="password">
              <PasswordInput label="Password" autoComplete="new-password" />
            </FormItem>
          </Grid>

          <Grid size={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={registerMutation.isPending}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};
