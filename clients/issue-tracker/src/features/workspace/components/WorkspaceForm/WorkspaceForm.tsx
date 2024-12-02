import React, { useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";

import TextField from "../../../../common/components/forms/TextField";
import ModalFooter from "../../../../common/components/ModalFooter";
import {
  CreateWorkspaceInput,
  useCreateWorkspaceMutation,
} from "../../../../api/codegen/gql/graphql";

interface WorkspaceFormProps {
  handleClose: () => void;
}

export default function WorkspaceForm({ handleClose }: WorkspaceFormProps) {
  const [createWorkspace] = useCreateWorkspaceMutation();

  const { control, formState, handleSubmit } = useForm<CreateWorkspaceInput>({
    defaultValues: { name: "", description: "" },
    mode: "all",
  });

  const onSubmit: SubmitHandler<CreateWorkspaceInput> = async ({
    name,
    description,
  }) => {
    await createWorkspace({ variables: { input: { name, description } } });
    handleClose();
  };

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <Grid2 rowSpacing={3} container>
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
            rows={4}
          />
        </Grid2>
      </Grid2>
      <ModalFooter handleClose={handleClose} />
    </Container>
  );
}
