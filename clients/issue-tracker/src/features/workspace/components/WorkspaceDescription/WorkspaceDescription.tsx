import React from "react";
import {
  Control,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { UpdateWorkspaceApiArg } from "../../../../api/generated/workspace.api";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "../../../../common/components/forms/TextField";
import Button from "../../../../common/components/buttons/Button";

interface Props {
  handleSubmit: UseFormHandleSubmit<UpdateWorkspaceApiArg["body"]>;
  control: Control<UpdateWorkspaceApiArg["body"]>;
  formState: FormState<UpdateWorkspaceApiArg["body"]>;
  defaultSchemas: any;
}

export default function WorkspaceDescription({
  control,
  defaultSchemas,
  formState,
  handleSubmit,
}: Props) {
  const onSubmit: SubmitHandler<UpdateWorkspaceApiArg["body"]> = () => {};

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
            title="Description"
            name="description"
            placeholder="Description"
            control={control}
            formState={formState}
            defaultSchemas={defaultSchemas}
            rows={4}
          />
          <Button label="Save" />
        </Grid>
      </Grid>
    </>
  );
}
