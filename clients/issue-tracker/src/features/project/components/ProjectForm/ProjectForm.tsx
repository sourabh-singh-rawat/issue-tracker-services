import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { ajvResolver } from "@hookform/resolvers/ajv";
import AjvFormats from "ajv-formats";

import { useTheme } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import MuiContainer from "@mui/material/Container";
import MuiTypography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import TextField from "../../../../common/components/forms/TextField";
import DatePicker from "../../../../common/components/DatePicker";
import TextButton from "../../../../common/components/buttons/TextButton";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";
import ProjectStatusSelector from "../ProjectStatusSelector";

import {
  useCreateProjectMutation,
  useGetProjectStatusListQuery,
} from "../../../../api/generated/project.api";
import { ProjectStatus } from "@issue-tracker/common";
// import schema from "../../../../api/generated/issue-tracker.openapi.json";

function ProjectForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: statusOptions, isLoading } = useGetProjectStatusListQuery();
  const [createProject, { data: createdProject, isSuccess }] =
    useCreateProjectMutation();

  const defaultValues = useMemo(
    () => ({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: ProjectStatus.NotStarted,
    }),
    [],
  );
  // const defaultSchemas: any = useMemo(
  //   () =>
  //     schema.paths["/api/v1/projects"].post.requestBody.content[
  //       "application/json"
  //     ].schema,
  //   [],
  // );
  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
    resolver: ajvResolver({}, {
      formats: { date: AjvFormats.get("date") },
    }),
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = ({
    name,
    description,
    startDate,
    endDate,
    status,
  }) => {
    createProject({
      body: {
        name,
        description,
        startDate: dayjs(startDate).isValid()
          ? dayjs(startDate).format()
          : undefined,
        endDate: dayjs(endDate).isValid() ? dayjs(endDate).format() : undefined,
        status,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/projects/${createdProject?.rows}/overview`);
    }
  }, [isSuccess]);

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <MuiGrid spacing={2} container>
        <MuiGrid xs={12} item sx={{ marginLeft: theme.spacing(-0.5) }}>
          <TextButton
            label="Back to projects"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/projects")}
          />
        </MuiGrid>

        <MuiGrid item xs={12}>
          <MuiTypography variant="h4" fontWeight="bold">
            New Project
          </MuiTypography>
          <MuiTypography variant="body1">
            Projects are container for storing issues.
          </MuiTypography>
        </MuiGrid>

        <MuiGrid item xs={12}>
          <TextField
            name="name"
            title="Name"
            control={control}
            formState={formState}
          />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <TextField
            name="description"
            title="Description"
            control={control}
            formState={formState}
            rows={4}
          />
        </MuiGrid>
        <MuiGrid item xs={6}>
          <DatePicker
            name="startDate"
            title="Start Date"
            control={control}
            formState={formState}
          />
        </MuiGrid>
        <MuiGrid item xs={6}>
          <DatePicker
            name="endDate"
            title="End Date"
            control={control}
            formState={formState}
          />
        </MuiGrid>

        <MuiGrid item xs={6}>
          <ProjectStatusSelector
            name="status"
            options={statusOptions?.rows}
            title="Project Status"
            control={control}
            formState={formState}
          />
        </MuiGrid>

        <MuiGrid item xs={12}>
          {!isLoading && <PrimaryButton type="submit" label="Create" />}
        </MuiGrid>
      </MuiGrid>
    </MuiContainer>
  );
}

export default ProjectForm;
