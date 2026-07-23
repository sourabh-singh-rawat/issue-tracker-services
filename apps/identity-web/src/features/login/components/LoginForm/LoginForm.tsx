import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useForm } from "@tanstack/react-form";
import { useLoginWithEmailAndPasswordMutation } from "@generated/api/@tanstack/react-query.gen";
import { useLoginStore } from "@features/login/stores";
import { Form, FormItem, PasswordInput, TextInput } from "@shared/ui";

export const LoginForm = () => {
  useLoginStore();

  const { mutateAsync: login, isPending } = useLoginWithEmailAndPasswordMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await login({
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
