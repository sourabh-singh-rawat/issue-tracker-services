import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useForm } from "@tanstack/react-form";
import { useRegisterWithEmailAndPasswordMutation } from "@generated/api/@tanstack/react-query.gen";
import { useSignUpStore } from "@features/signup/stores";
import { Form, FormItem, PasswordInput, TextInput } from "@shared/ui";

export const SignupForm = () => {
  useSignUpStore();

  const { mutateAsync: registerUser, isPending } = useRegisterWithEmailAndPasswordMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await registerUser({
        body: {
          email: value.email,
          password: value.password,
        },
      });
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
            <Button type="submit" variant="contained" fullWidth disabled={isPending}>
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};
