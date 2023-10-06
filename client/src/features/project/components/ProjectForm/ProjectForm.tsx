import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo } from "react";
import { ajvResolver } from "@hookform/resolvers/ajv";
import AjvFormats from "ajv-formats";

import MuiContainer from "@mui/material/Container";
import MuiGrid from "@mui/material/Grid";
import MuiTypography from "@mui/material/Typography";

import { SubmitHandler, useForm } from "react-hook-form";

import { useCreateProjectMutation } from "../../../../api/generated/project.api";
import TextField from "../../../../common/components/forms/TextField";
import DatePicker from "../../../../common/components/DatePicker";
import openapi from "../../../../api/generated/openapi.json";

function ProjectForm() {
  const [createProject, { data, isSuccess }] = useCreateProjectMutation();
  const navigate = useNavigate();

  const defaultValues = useMemo(
    () => ({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "",
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
    createProject({ body: { name, description, startDate, endDate, status } });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`projects/${data}/overview`);
    }
  }, [isSuccess]);

  return (
    <MuiContainer component="form" onSubmit={handleSubmit(onSubmit)}>
      <MuiGrid container rowSpacing={2} columnSpacing={2}>
        <MuiGrid item xs={12}>
          <MuiTypography variant="h4">New Project</MuiTypography>
          <MuiTypography variant="subtitle1">
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
      </MuiGrid>
    </MuiContainer>
  );

  // <MuiGrid rowSpacing={2} container>
  //   <MuiGrid xs={12} item>
  //     <SectionHeader
  //       subtitle="Projects are container for storing issues."
  //       title="New Project"
  //     />
  //   </MuiGrid>
  //   <MuiGrid xs={12} item>
  //     <Box component="form" onSubmit={handleSubmit}>
  //       <MuiGrid columnSpacing={4} rowSpacing={3} container>
  //         <MuiGrid xs={12} item>
  //           <TextField
  //             error={formFields.name.error}
  //             helperText={
  //               formFields.name.error
  //                 ? formFields.name.errorMessage
  //                 : `A name for your project. Do not exceed ${errors.form.project.NAME_MAX_LENGTH_ERROR.limit} characters`
  //             }
  //             name="name"
  //             title="Name"
  //             type="text"
  //             value={formFields.name.value}
  //             onChange={handleNameChange}
  //           />
  //         </MuiGrid>
  //         <MuiGrid md={12} sm={12} xs={12} item>
  //           <TextField
  //             error={formFields.description.error}
  //             helperText={
  //               formFields.description.error
  //                 ? formFields.description.errorMessage
  //                 : `A text description of your project. Do not exceed ${errors.form.project.DESCRIPTION_MAX_LENGTH_ERROR.limit} characters`
  //             }
  //             minRows={4}
  //             name="Description"
  //             placeholder={formFields.description.placeHolder}
  //             title="Description"
  //             type="text"
  //             value={formFields.description.value}
  //             multiline
  //             onChange={handleDescriptionChange}
  //           />
  //         </MuiGrid>
  //         <MuiGrid md={6} sm={12} xs={12} item>
  //           <DatePicker
  //             handleChange={handleChange}
  //             helperText="Set a start date for your project"
  //             maxDate={formFields.endDate}
  //             name="startDate"
  //             title="Start Date"
  //             value={formFields.startDate}
  //             onChange={(selectedDate) =>
  //               setFormFields({ ...formFields, startDate: selectedDate })
  //             }
  //           />
  //         </MuiGrid>
  //         <MuiGrid md={6} sm={12} xs={12} item>
  //           <DatePicker
  //             handleChange={handleChange}
  //             helperText="Set an end date for your project"
  //             minDate={formFields.startDate}
  //             name="endDate"
  //             title="End Date"
  //             value={formFields.endDate}
  //             onChange={(selectedDate) =>
  //               setFormFields({ ...formFields, endDate: selectedDate })
  //             }
  //           />
  //         </MuiGrid>
  //         <MuiGrid md={6} sm={12} xs={12} item>
  //           <ProjectStatusSelector
  //             handleChange={handleChange}
  //             helperText="Current status of your project."
  //             name="status"
  //             title="Status"
  //             value={formFields.status}
  //           />
  //         </MuiGrid>
  //         <MuiGrid xs={12} item />
  //         <MuiGrid item>
  //           <PrimaryButton label="Create Project" type="submit" />
  //         </MuiGrid>
  //       </MuiGrid>
  //     </Box>
  //   </MuiGrid>
  // </MuiGrid>
}

export default ProjectForm;
