import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateSpaceInput,
  useCreateSpaceMutation,
} from "../../api/codegen/gql/graphql";
import { useMessageBar } from "../message-bar/hooks";
import { Container, Grid2, Typography } from "@mui/material";
import TextField from "../../common/components/forms/TextField";
import PrimaryButton from "../../common/components/buttons/PrimaryButton";

interface SpaceFormProps {
  workspaceId: string;
}

export function SpaceForm({ workspaceId }: SpaceFormProps) {
  const messageBar = useMessageBar();
  const [createSpace] = useCreateSpaceMutation({
    onCompleted() {
      messageBar.showSuccess("Space created successfully");
    },
    onError() {
      messageBar.showError("Failed to create space");
    },
  });
  const { control, formState, handleSubmit } = useForm<CreateSpaceInput>();

  const onSubmit: SubmitHandler<CreateSpaceInput> = async ({
    name,
    description,
  }) => {
    await createSpace({
      variables: { input: { name, description, workspaceId } },
    });
  };

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <Grid2 container rowSpacing={2}>
        <Grid2 size={12}>
          <TextField
            name="name"
            title="Name"
            placeholder="Name"
            control={control}
            formState={formState}
            autoFocus
          />
        </Grid2>

        <Grid2 size={12}>
          <TextField
            name="description"
            title="Description"
            placeholder="Description"
            control={control}
            formState={formState}
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
