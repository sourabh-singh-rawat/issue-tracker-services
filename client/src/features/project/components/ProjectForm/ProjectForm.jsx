import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Toolbar, Typography } from "@mui/material";
import MuiGrid from "@mui/material/Grid";

import TextField from "../../../../common/TextField";
import DatePicker from "../../../../common/DatePicker";
import BackButton from "../../../../common/BackButton/BackButton";
import SectionHeader from "../../../../common/SectionHeader/SectionHeader";

import ProjectStatusSelector from "../ProjectStatusSelector/ProjectStatusSelector";

import { useCreateProjectMutation } from "../../project.api";

const ProjectForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createProject, { isSuccess, data }] = useCreateProjectMutation();
  const user = useSelector((store) => store.auth.user);
  const [formFields, setFormFields] = useState({
    name: "My Project",
    description: "",
    status: 0,
    start_date: null,
    end_date: null,
  });

  useEffect(() => {
    if (isSuccess) navigate(`/projects/${data.id}/overview`);
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    createProject({ payload: formFields });
    e.preventDefault();
  };

  return (
    <MuiGrid container gap="20px">
      <MuiGrid item xs={12}>
        <SectionHeader
          title="New Project"
          subtitle="Projects are container for storing issues."
        />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <Box component="form" onSubmit={handleSubmit}>
          <MuiGrid container rowSpacing="20px" columnSpacing={4}>
            <MuiGrid item xs={12}>
              <TextField
                title="Name"
                name="name"
                type="text"
                onChange={handleChange}
                helperText="A name for your project"
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
                onChange={handleChange}
                rows={4}
                helperText="A text description of your project. Do not exceed 150 characters"
                multiline
              />
            </MuiGrid>
          </MuiGrid>
          <MuiGrid container marginLeft={0}>
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
