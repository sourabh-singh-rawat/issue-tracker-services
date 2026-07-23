import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useForm } from "@tanstack/react-form";
import { useRegisterUserWithEmailAndPasswordMutation } from "@generated/gql/hooks";
import type { RegisterUserInput } from "@generated/gql/graphql";
import { useSignUpStore } from "@features/signup/stores";
import { Form, FormItem, PasswordInput, TextInput } from "@shared/ui";

export const SignupForm = () => {
  useSignUpStore();

  const { mutateAsync: registerUser, isPending } = useRegisterUserWithEmailAndPasswordMutation();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies RegisterUserInput,
    onSubmit: async ({ value }) => {
      await registerUser({ input: value });
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
