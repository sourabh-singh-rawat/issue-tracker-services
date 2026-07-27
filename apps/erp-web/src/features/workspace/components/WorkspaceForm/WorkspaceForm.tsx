import { SubmitHandler, useForm } from "react-hook-form";

import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";

import type { CreateWorkspaceInput } from "@generated/gql/graphql";
import { useCreateWorkspaceMutation } from "@generated/gql";
import { ModalFooter, TextField } from "@shared";

interface WorkspaceFormProps {
  handleClose: () => void;
}

export default function WorkspaceForm({ handleClose }: WorkspaceFormProps) {
  const { mutateAsync: createWorkspace } = useCreateWorkspaceMutation();

  const form = useForm<CreateWorkspaceInput>({
    defaultValues: { name: "", description: "" },
    mode: "all",
  });

  const onSubmit: SubmitHandler<CreateWorkspaceInput> = async ({ name, description }) => {
    await createWorkspace({ input: { name, description } });
    handleClose();
  };

  return (
    <Container component="form" onSubmit={form.handleSubmit(onSubmit)} disableGutters>
      <Grid2 rowSpacing={3} container>
        <Grid2 size={12}>
          <TextField name="name" label="Name" placeholder="Name" form={form} autoFocus />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            name="description"
            label="Description"
            placeholder="Description"
            rows={4}
            form={form}
          />
        </Grid2>
      </Grid2>
      <ModalFooter handleClose={handleClose} />
    </Container>
  );
}
