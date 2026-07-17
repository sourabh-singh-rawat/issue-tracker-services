import React from "react";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormReturn,
} from "react-hook-form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TextField } from "../../../../common/components/forms/TextField";
import Button from "../../../../common/components/buttons/Button";

export type UpdateWorkspaceForm = {
  name?: string;
  description?: string;
};

interface Props {
  handleSubmit: UseFormHandleSubmit<UpdateWorkspaceForm>;
  form: UseFormReturn<UpdateWorkspaceForm>;
  defaultSchemas?: any;
}

export default function WorkspaceDescription({
  form,
  defaultSchemas,
  handleSubmit,
}: Props) {
  const onSubmit: SubmitHandler<UpdateWorkspaceForm> = () => {};

  return (
    <>
      <Grid container>
        <Grid item xs={5}>
          <Typography variant="body1">Description</Typography>
          <Typography variant="body2">
            A description for your workspace
          </Typography>
        </Grid>
        <Grid item xs={7} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Description"
            name="description"
            placeholder="Description"
            form={form}
            defaultSchemas={defaultSchemas}
            rows={4}
          />
          <Button label="Save" />
        </Grid>
      </Grid>
    </>
  );
}
