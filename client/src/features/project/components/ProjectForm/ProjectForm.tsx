import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo } from "react";
import { ajvResolver } from "@hookform/resolvers/ajv";
import AjvFormats from "ajv-formats";
import dayjs from "dayjs";

import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import { SubmitHandler, useForm } from "react-hook-form";

import {
  useCreateProjectMutation,
  useGetProjectStatusListQuery,
} from "../../../../api/generated/project.api";
import TextField from "../../../../common/components/forms/TextField";
import DatePicker from "../../../../common/components/DatePicker";
import openapi from "../../../../api/generated/openapi.json";
import ProjectStatusSelector from "../ProjectStatusSelector";
import PrimaryButton from "../../../../common/components/buttons/PrimaryButton";

function ProjectForm() {
  const { data: statusOptions, isLoading } = useGetProjectStatusListQuery();
  const [createProject, { data: createdProject, isSuccess }] =
    useCreateProjectMutation();
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "Not Started",
    }),
    [],
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultSchemas: any = useMemo(
    () =>
      openapi.paths["/projects"].post.requestBody.content["application/json"]
        .schema,
    [],
  );
  const { control, formState, handleSubmit } = useForm({
    defaultValues,
    mode: "all",
    resolver: ajvResolver(defaultSchemas, {
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
      navigate(`projects/${createdProject?.rows}/overview`);
    }
  }, [isSuccess]);

  return (
    <MuiContainer
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      disableGutters
    >
      <MuiGrid container rowSpacing={2} columnSpacing={2}>
        <MuiGrid item xs={12}>
          <MuiTypography variant="h4" fontWeight={600}>
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
            isMultiline
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
