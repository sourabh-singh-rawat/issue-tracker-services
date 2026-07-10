import { SubmitHandler, useForm } from "react-hook-form";

import { Container, Grid2 } from "@mui/material";
import type { CreateSpaceInput } from "@generated/gql/graphql";
import { useCreateSpaceMutation } from "@generated/gql";
import { PrimaryButton, TextField, useSnackbar } from "@common";

interface SpaceFormProps {
  workspaceId: string;
}

export function SpaceForm({ workspaceId }: SpaceFormProps) {
  const messageBar = useSnackbar();
  const { mutateAsync: createSpace } = useCreateSpaceMutation();
  const form = useForm<CreateSpaceInput>();

  const onSubmit: SubmitHandler<CreateSpaceInput> = async ({
    name,
    description,
  }) => {
    try {
      await createSpace({ input: { name, description, workspaceId } });
      messageBar.success("Space created successfully");
    } catch {
      messageBar.error("Failed to create space");
    }
  };

  return (
    <Container
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
      disableGutters
    >
      <Grid2 container rowSpacing={2}>
        <Grid2 size={12}>
          <TextField
            name="name"
            label="Name"
            placeholder="Name"
            form={form}
            autoFocus
          />
        </Grid2>

        <Grid2 size={12}>
          <TextField
            name="description"
            label="Description"
            placeholder="Description"
            form={form}
            autoFocus
            rows={4}
          />
        </Grid2>

        <Grid2 size={12}>
          <PrimaryButton type="submit" label="Create" />
        </Grid2>
      </Grid2>
    </Container>
  );
}
