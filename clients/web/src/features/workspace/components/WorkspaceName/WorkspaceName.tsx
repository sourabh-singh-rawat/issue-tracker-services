import {
  Control,
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import Button from "../../../../common/components/buttons/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "../../../../common";
import Grid from "@mui/material/Grid";
import React from "react";

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
            label="Name"
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
