/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";

import DatePicker from "../../../../common/DatePicker";
import PrimaryButton from "../../../../common/PrimaryButton";
import ProjectStatusSelector from "../../components/ProjectStatusSelector";
import SectionHeader from "../../../../common/SectionHeader";
import TextField from "../../../../common/TextField";

import errors from "../../../../errors";

import { setStatus } from "../../project.slice";

import { useCreateProjectMutation, useGetStatusQuery } from "../../project.api";

function ProjectForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    name: {
      value: "",
      error: false,
      errorMessage: errors.form.project.NAME_MAX_LENGTH_ERROR.message,
    },
    description: {
      value: "",
      error: false,
      errorMessage: errors.form.project.DESCRIPTION_MAX_LENGTH_ERROR.message,
    },
    status: "",
    startDate: null,
    endDate: null,
  });

  const defaultStatus = useSelector(
    (store) => store.project.options.status.rows[0],
  );

  const getProjectStatusQuery = useGetStatusQuery();
  const [createProject, { isSuccess, data }] = useCreateProjectMutation();

  useEffect(() => {
    setFormFields({ ...formFields, status: defaultStatus.id });
  }, [defaultStatus]);

  const handleNameChange = (e) => {
    const { value } = e.target;

    if (value.length > errors.form.project.NAME_MAX_LENGTH_ERROR.limit) {
      return setFormFields({
        ...formFields,
        name: { ...formFields.name, value, error: true },
      });
    }
    setFormFields({
      ...formFields,
      name: { ...formFields.name, value, error: false },
    });
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;

    if (value.length > errors.form.project.DESCRIPTION_MAX_LENGTH_ERROR.limit) {
      return setFormFields({
        ...formFields,
        description: { ...formFields.description, value, error: true },
      });
    }
    setFormFields({
      ...formFields,
      description: { ...formFields.description, value, error: false },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  // Side Effects
  useEffect(() => {
    if (getProjectStatusQuery.isSuccess) {
      setFormFields({ ...formFields, status: defaultStatus.id });
      dispatch(setStatus(getProjectStatusQuery.data));
    }
  }, [getProjectStatusQuery.data]);

  useEffect(() => {
    if (isSuccess) navigate(`/projects/${data.data}/overview`);
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formFields.name.error || formFields.description.error) {
      return;
    }

    createProject({ body: formFields });
  };

  return (
    <MuiGrid rowSpacing={2} container>
      <MuiGrid xs={12} item>
        <SectionHeader
          subtitle="Projects are container for storing issues."
          title="New Project"
        />
      </MuiGrid>
      <MuiGrid xs={12} item>
        <Box component="form" onSubmit={handleSubmit}>
          <MuiGrid columnSpacing={4} rowSpacing={3} container>
            <MuiGrid xs={12} item>
              <TextField
                error={formFields.name.error}
                helperText={
                  formFields.name.error
                    ? formFields.name.errorMessage
                    : `A name for your project. Do not exceed ${errors.form.project.NAME_MAX_LENGTH_ERROR.limit} characters`
                }
                name="name"
                title="Name"
                type="text"
                value={formFields.name.value}
                onChange={handleNameChange}
              />
            </MuiGrid>
            <MuiGrid md={12} sm={12} xs={12} item>
              <TextField
                error={formFields.description.error}
                helperText={
                  formFields.description.error
                    ? formFields.description.errorMessage
                    : `A text description of your project. Do not exceed ${errors.form.project.DESCRIPTION_MAX_LENGTH_ERROR.limit} characters`
                }
                minRows={4}
                name="Description"
                placeholder={formFields.description.placeHolder}
                title="Description"
                type="text"
                value={formFields.description.value}
                multiline
                onChange={handleDescriptionChange}
              />
            </MuiGrid>
            <MuiGrid md={6} sm={12} xs={12} item>
              <DatePicker
                handleChange={handleChange}
                helperText="Set a start date for your project"
                maxDate={formFields.endDate}
                name="startDate"
                title="Start Date"
                value={formFields.startDate}
                onChange={(selectedDate) =>
                  setFormFields({ ...formFields, startDate: selectedDate })
                }
              />
            </MuiGrid>
            <MuiGrid md={6} sm={12} xs={12} item>
              <DatePicker
                handleChange={handleChange}
                helperText="Set an end date for your project"
                minDate={formFields.startDate}
                name="endDate"
                title="End Date"
                value={formFields.endDate}
                onChange={(selectedDate) =>
                  setFormFields({ ...formFields, endDate: selectedDate })
                }
              />
            </MuiGrid>
            <MuiGrid md={6} sm={12} xs={12} item>
              <ProjectStatusSelector
                handleChange={handleChange}
                helperText="Current status of your project."
                name="status"
                title="Status"
                value={formFields.status}
              />
            </MuiGrid>
            <MuiGrid xs={12} item />
            <MuiGrid item>
              <PrimaryButton label="Create Project" type="submit" />
            </MuiGrid>
          </MuiGrid>
        </Box>
      </MuiGrid>
    </MuiGrid>
  );
}

export default ProjectForm;
