import React, { useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateWorkspaceMutation } from "../../../../api/generated/workspace.api";
import AjvFormats from "ajv-formats";
import { ajvResolver } from "@hookform/resolvers/ajv";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import TextField from "../../../../common/components/forms/TextField";
import ModalFooter from "../../../../common/components/ModalFooter";
import schema from "../../../../api/generated/issue-tracker.openapi.json";

interface WorkspaceFormProps {
  handleClose: () => void;
}

export default function WorkspaceForm({ handleClose }: WorkspaceFormProps) {
  const [createWorkspace] = useCreateWorkspaceMutation();
  const defaultValues = useMemo(
    () => ({ name: "Workspace Name", description: "" }),
    [],
  );
  const defaultSchemas: any = useMemo(
    () =>
      schema.paths["/api/v1/workspaces"].post.requestBody.content[
        "application/json"
      ].schema,
    [],
  );

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
    resolver: ajvResolver(defaultSchemas, {
      formats: { email: AjvFormats.get("email") },
    }),
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async ({
    name,
    description,
  }) => {
    await createWorkspace({ body: { name, description } });
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
            defaultSchemas={defaultSchemas}
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
            defaultSchemas={defaultSchemas}
          />
        </Grid>
      </Grid>
      <ModalFooter handleClose={handleClose} />
    </Container>
  );
}
