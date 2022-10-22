import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import errors from "../../../../app/errors";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiGrid from "@mui/material/Grid";

import TextField from "../../../../common/TextField";
import DatePicker from "../../../../common/DatePicker";
import SectionHeader from "../../../../common/SectionHeader";
import ProjectStatusSelector from "../../components/containers/ProjectStatusSelector";

import { setStatus } from "../../project.slice";
import { useGetStatusQuery, useCreateProjectMutation } from "../../project.api";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getProjectStatusQuery = useGetStatusQuery();
  const [createProject, { isSuccess, data }] = useCreateProjectMutation();

  const [formFields, setFormFields] = useState({
    name: {
      value: "",
      error: false,
      errorMessage: errors.form.project.NAME_MAX_LENGTH_ERROR.message,
    },
    description: {
      value: "",
      charCount: 0,
      error: false,
      errorMessage: errors.form.project.DESCRIPTION_MAX_LENGTH_ERROR.message,
    },
    status: "0_NOT_STARTED",
    start_date: null,
    end_date: null,
  });

  const handleNameChange = (e) => {
    const { name, value } = e.target;

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
    const { name, value } = e.target;

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

  useEffect(() => {
    if (getProjectStatusQuery.isSuccess)
      dispatch(setStatus(getProjectStatusQuery.data));
  }, [getProjectStatusQuery.data]);

  useEffect(() => {
    if (isSuccess) navigate(`/projects/${data.id}/overview`);
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formFields.name.error || formFields.description.error)
      return console.log("Form Field Errors");
    createProject({ body: formFields });
  };

  return (
    <MuiGrid container rowSpacing={2}>
      <MuiGrid item xs={12}>
        <SectionHeader
          title="New Project"
          subtitle="Projects are container for storing issues."
        />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Box component="form" onSubmit={handleSubmit}>
          <MuiGrid container rowSpacing={2} columnSpacing={4}>
            <MuiGrid item xs={12}>
              <TextField
                title="Name"
                name="name"
                type="text"
                value={formFields.name.value}
                onChange={handleNameChange}
                error={formFields.name.error}
                helperText={
                  formFields.name.error
                    ? formFields.name.errorMessage
                    : `A name for your project. Do not exceed ${errors.form.project.NAME_MAX_LENGTH_ERROR.limit} characters`
                }
                required
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={12} md={6}>
              <DatePicker
                title="Start Date"
                name="start_date"
                value={formFields.start_date}
                maxDate={formFields.end_date}
                onChange={(date) =>
                  setFormFields({ ...formFields, start_date: date })
                }
                helperText="Set a start date for your project"
                handleChange={handleChange}
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={12} md={6}>
              <DatePicker
                title="End Date"
                name="end_date"
                value={formFields.end_date}
                minDate={formFields.start_date}
                onChange={(date) =>
                  setFormFields({ ...formFields, end_date: date })
                }
                helperText="Set an end date for your project"
                handleChange={handleChange}
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={12} md={6}>
              <ProjectStatusSelector
                title="Status"
                name="status"
                value={formFields.status}
                handleChange={handleChange}
                helperText="Current status of your project."
              />
            </MuiGrid>
            <MuiGrid item md={6}></MuiGrid>
            <MuiGrid item xs={12} sm={12} md={12}>
              <TextField
                name="Description"
                title="Description"
                type="text"
                minRows={4}
                value={formFields.description.value}
                placeholder={formFields.description.placeHolder}
                error={formFields.description.error}
                onChange={handleDescriptionChange}
                helperText={
                  formFields.description.error
                    ? formFields.description.errorMessage
                    : `A text description of your project. Do not exceed ${errors.form.project.DESCRIPTION_MAX_LENGTH_ERROR.limit} characters`
                }
                multiline
              />
            </MuiGrid>
            <MuiGrid item>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Create Project
              </Button>
            </MuiGrid>
          </MuiGrid>
        </Box>
      </MuiGrid>
    </MuiGrid>
  );
};

export default ProjectForm;
