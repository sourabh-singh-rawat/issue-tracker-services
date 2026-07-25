import { SubmitHandler, UseFormHandleSubmit, UseFormReturn } from "react-hook-form";
import Button from "../../../../shared/components/buttons/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@shared";
import Grid from "@mui/material/Grid";
import React from "react";
import type { UpdateWorkspaceForm } from "../WorkspaceDescription/WorkspaceDescription";

interface Props {
  handleSubmit: UseFormHandleSubmit<UpdateWorkspaceForm>;
  form: UseFormReturn<UpdateWorkspaceForm>;
  defaultSchemas?: any;
}

export default function WorkspaceName({ handleSubmit, form, defaultSchemas }: Props) {
  const onSubmit: SubmitHandler<UpdateWorkspaceForm> = () => {};

  return (
    <>
      <Grid container>
        <Grid item xs={5}>
          <Typography variant="body1">Information</Typography>
          <Typography variant="body2">The basic information about your workspace</Typography>
        </Grid>
        <Grid item xs={7} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            name="name"
            placeholder="workspace name"
            form={form}
            defaultSchemas={defaultSchemas}
          />
          <Button label="Save" />
        </Grid>
      </Grid>
    </>
  );
}
