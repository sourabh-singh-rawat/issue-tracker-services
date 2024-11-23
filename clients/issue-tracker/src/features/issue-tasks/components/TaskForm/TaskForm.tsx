import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import AjvFormats from "ajv-formats";
import { ajvResolver } from "@hookform/resolvers/ajv";
import { useCreateIssueTaskMutation } from "../../../../api/generated/issue.api";

import MuiGrid from "@mui/material/Grid";
import MuiContainer from "@mui/material/Container";
import MuiInputAdornment from "@mui/material/InputAdornment";

import schema from "../../../../api/generated/issue-tracker.openapi.json";
import TextField from "../../../../common/components/forms/TextField";
import DatePicker from "../../../../common/components/DatePicker";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import CancelButton from "../../../../common/components/CancelButton";

import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function TaskForm() {
  const { id } = useParams();
  const [createTask] = useCreateIssueTaskMutation();

  const defaultValues = useMemo(
    () => ({ description: "", dueDate: "", completed: false }),
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const defaultSchemas: any = useMemo(
  //   () =>
  //     schema.paths["/api/v1/issues/{id}/tasks"].post.requestBody.content[
  //       "application/json"
  //     ].schema,
  //   [],
  // );

  const { control, formState, handleSubmit, reset } = useForm({
    defaultValues,
    mode: "all",
    resolver: ajvResolver({}, {
      formats: { date: AjvFormats.get("date") },
    }),
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = ({
    description,
    dueDate,
  }) => {
    if (!description) throw new Error("Please add a description");

    createTask({
      id,
      body: {
        description,
        completed: false,
        dueDate: dueDate ? dueDate : null,
      },
    });
    reset();
  };

  const handleCancel = () => reset();

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <MuiGrid spacing={1} container>
        <MuiGrid flexGrow={1} item>
          <TextField
            name="description"
            placeholder="Add a task..."
            control={control}
            formState={formState}
            startAdornment={
              <MuiInputAdornment position="start">
                <AddCircleIcon />
              </MuiInputAdornment>
            }
            endAdornment={
              <MuiInputAdornment position="end"></MuiInputAdornment>
            }
          />
        </MuiGrid>
        {formState.isDirty && (
          <>
            <MuiGrid item>
              <DatePicker
                sx={{ border: 0 }}
                name="dueDate"
                control={control}
                formState={formState}
              />
            </MuiGrid>
            <MuiGrid item display="flex">
              <PrimaryButton label="Save" type="submit" />
            </MuiGrid>
            <MuiGrid item>
              <CancelButton label="Cancel" onClick={handleCancel} />
            </MuiGrid>
          </>
        )}
      </MuiGrid>
    </MuiContainer>
  );
}
