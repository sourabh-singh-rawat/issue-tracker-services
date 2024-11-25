import React, { useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import TextField from "../../../../common/components/forms/TextField";
import ModalFooter from "../../../../common/components/ModalFooter";
import { useCreateWorkspaceMutation } from "../../../../api/codegen/gql/graphql";

interface WorkspaceFormProps {
  handleClose: () => void;
}

export default function WorkspaceForm({ handleClose }: WorkspaceFormProps) {
  const [createWorkspace] = useCreateWorkspaceMutation();
  const defaultValues = useMemo(
    () => ({ name: "Workspace Name", description: "" }),
    [],
  );

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async ({
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
      <Grid rowSpacing={3} container>
        <Grid item xs={12}>
          <TextField
            name="name"
            title="Name"
            placeholder="Name"
            control={control}
            formState={formState}
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            title="Description"
            placeholder="Description"
            control={control}
            formState={formState}
            rows={4}
          />
        </Grid>
      </Grid>
      <ModalFooter handleClose={handleClose} />
    </Container>
  );
}
