import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useForm } from "@tanstack/react-form";
import { useSearch } from "@tanstack/react-router";
import { useLoginWithEmailAndPasswordMutation } from "@generated/api/@tanstack/react-query.gen";
import { useLoginStore } from "@features/login/stores";
import { Form, FormItem, PasswordInput, TextInput } from "@shared/ui";

export const LoginForm = () => {
  useLoginStore();

  const { login_challenge: loginChallenge } = useSearch({ from: "/(no-auth)/login" });
  const { mutateAsync: login, isPending } = useLoginWithEmailAndPasswordMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const result = await login({
        body: {
          email: value.email,
          password: value.password,
        },
        query: loginChallenge ? { login_challenge: loginChallenge } : undefined,
      });

      if (result.redirectTo) {
        window.location.assign(result.redirectTo);
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
              <PasswordInput label="Password" autoComplete="current-password" />
            </FormItem>
          </Grid>

          <Grid size={12}>
            <Button type="submit" variant="contained" fullWidth disabled={isPending}>
              Log in
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};
