import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import errors from "../../../../errors";

import Box from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";

import DatePicker from "../../../../common/dates/DatePicker";
import TextField from "../../../../common/textfields/TextField";
import PrimaryButton from "../../../../common/buttons/PrimaryButton";
import SectionHeader from "../../../../common/headers/SectionHeader";
import ProjectStatusSelector from "../../components/containers/ProjectStatusSelector";

import { setStatus } from "../../slice/project.slice";
import {
  useGetStatusQuery,
  useCreateProjectMutation,
} from "../../api/project.api";

const ProjectForm = () => {
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
    (store) => store.project.options.status.rows[0]
  );

  const getProjectStatusQuery = useGetStatusQuery();
  const [createProject, { isSuccess, data }] = useCreateProjectMutation();

  useEffect(() => {
    setFormFields({ ...formFields, status: defaultStatus.id });
  }, [defaultStatus]);

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
    if (getProjectStatusQuery.isSuccess) {
      setFormFields({ ...formFields, status: defaultStatus.id });
      dispatch(setStatus(getProjectStatusQuery.data));
    }
  }, [getProjectStatusQuery.data]);

  useEffect(() => {
    if (isSuccess) navigate(`/projects/${data.id}/overview`);
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formFields.name.error || formFields.description.error) {
      return console.log("Form Field Errors");
    }

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
              />
            </MuiGrid>
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
            <MuiGrid item xs={12} sm={12} md={6}>
              <DatePicker
                title="Start Date"
                name="startDate"
                value={formFields.startDate}
                maxDate={formFields.endDate}
                onChange={(selectedDate) =>
                  setFormFields({ ...formFields, startDate: selectedDate })
                }
                helperText="Set a start date for your project"
                handleChange={handleChange}
              />
            </MuiGrid>
            <MuiGrid item xs={12} sm={12} md={6}>
              <DatePicker
                title="End Date"
                name="endDate"
                value={formFields.endDate}
                minDate={formFields.startDate}
                onChange={(selectedDate) =>
                  setFormFields({ ...formFields, endDate: selectedDate })
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
            <MuiGrid item xs={12}></MuiGrid>
            <MuiGrid item>
              <PrimaryButton label="Create Project" type="submit" />
            </MuiGrid>
          </MuiGrid>
        </Box>
      </MuiGrid>
    </MuiGrid>
  );
};

export default ProjectForm;
