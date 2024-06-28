import React from "react";
import {
  Control,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import TextField from "../../../../common/components/forms/TextField";
import { UpdateWorkspaceApiArg } from "../../../../api/generated/workspace.api";
import Button from "../../../../common/components/buttons/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface Props {
  handleSubmit: UseFormHandleSubmit<UpdateWorkspaceApiArg["body"]>;
  control: Control<UpdateWorkspaceApiArg["body"]>;
  formState: FormState<UpdateWorkspaceApiArg["body"]>;
  defaultSchemas: any;
}

export default function WorkspaceName({
  handleSubmit,
  control,
  formState,
  defaultSchemas,
}: Props) {
  const onSubmit: SubmitHandler<UpdateWorkspaceApiArg["body"]> = () => {};

  return (
    <>
      <Grid container>
        <Grid item xs={5}>
          <Typography variant="body1">Information</Typography>
          <Typography variant="body2">
            The basic information about your workspace
          </Typography>
        </Grid>
        <Grid item xs={7} component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            title="Name"
            name="name"
            placeholder="workspace name"
            control={control}
            formState={formState}
            defaultSchemas={defaultSchemas}
          />
          <Button label="Save" />
        </Grid>
      </Grid>
    </>
  );
}
