import React, { useMemo } from "react";
import { formatISO } from "date-fns";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AjvFormats from "ajv-formats";
import { ajvResolver } from "@hookform/resolvers/ajv";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";
import MuiContainer from "@mui/material/Container";
import CancelButton from "../../../../common/components/CancelButton";

import { resetTasks } from "../../issue-tasks.slice";
import { useCreateIssueTaskMutation } from "../../../../api/generated/issue.api";
import { SubmitHandler, useForm } from "react-hook-form";
import openapi from "../../../../api/generated/openapi.json";
import TextField from "../../../../common/components/forms/TextField";
import DatePicker from "../../../../common/components/DatePicker";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";

function TaskForm({ setOpen }) {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [createTask] = useCreateIssueTaskMutation();

  const defaultDueDate = formatISO(new Date());

  const defaultValues = useMemo(
    () => ({
      description: "",
      dueDate: "",
      completed: false,
    }),
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSchemas: any = useMemo(
    () =>
      openapi.paths["/issues/{id}/tasks"].post.requestBody.content[
        "application/json"
      ].schema,
    [],
  );

  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
    resolver: ajvResolver(defaultSchemas, {
      formats: { date: AjvFormats.get("date") },
    }),
  });

  const handleDateChange = (selectedDate) => {
    setTask({ ...task, dueDate: selectedDate });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<typeof defaultValues> = ({
    description,
    dueDate,
  }) => {
    if (!description) throw new Error("Please add a description");

    createTask({
      id,
      body: { description, completed: false, dueDate },
    });
    dispatch(resetTasks());
    setOpen(false);
  };

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <MuiGrid spacing={2} container>
        <MuiGrid item xs={12}>
          <MuiTypography variant="h6">Create Task</MuiTypography>
        </MuiGrid>
        <MuiGrid xs={12} item>
          <TextField
            name="description"
            title="Description"
            control={control}
            formState={formState}
          />
        </MuiGrid>
        <MuiGrid xs={12} item>
          <DatePicker
            name="dueDate"
            title="Due Date"
            control={control}
            formState={formState}
          />
        </MuiGrid>
        <MuiGrid item>
          <PrimaryButton label="Create" type="submit" />
        </MuiGrid>
        <MuiGrid item>
          <CancelButton label="Cancel" onClick={handleCancel} />
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

export default TaskForm;
