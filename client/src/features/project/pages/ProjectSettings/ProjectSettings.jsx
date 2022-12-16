import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format, formatISO, parseISO } from "date-fns";

import { useTheme } from "@mui/material/styles";
import MuiGrid from "@mui/material/Grid";
import MuiDivider from "@mui/material/Divider";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/tabs/TabPanel";
import DatePicker from "../../../../common/dates/DatePicker";
import TextField from "../../../../common/textfields/TextField";

import PrimaryButton from "../../../../common/buttons/PrimaryButton";
import ProjectStatusSelector from "../../components/containers/ProjectStatusSelector";

import { updateProject } from "../../slice/project.slice";
import { setMessageBarOpen } from "../../../message-bar/slice/message-bar.slice";
import { useUpdateProjectMutation } from "../../api/project.api";

const ProjectSettings = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();

  const project = useSelector((store) => store.project.settings);

  const [updateProjectMutation, { isSuccess }] = useUpdateProjectMutation();

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateProject({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, status, end_date, start_date } = project;

    await updateProjectMutation({
      id: project.id,
      body: { name, description, status, end_date, start_date },
    });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setMessageBarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel selectedTab={selectedTab} index={4}>
      <MuiGrid
        container
        component="form"
        onSubmit={handleSubmit}
        rowSpacing={3}
      >
        <MuiGrid item xs={12}>
          <MuiGrid container>
            <MuiGrid item xs={12} md={4}>
              <MuiTypography variant="body2" sx={{ fontWeight: 600 }}>
                Basic Information
              </MuiTypography>
            </MuiGrid>
            <MuiGrid item xs={12} md={8}>
              <MuiGrid container rowSpacing={3}>
                <MuiGrid item xs={12}>
                  <TextField
                    name="name"
                    title="Name"
                    value={project.name}
                    isLoading={project.isLoading}
                    onChange={handleChange}
                    required
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <TextField
                    name="description"
                    title="Description"
                    helperText="A free text description of the project. Max character count is 150"
                    value={project.description}
                    isLoading={project.isLoading}
                    onChange={handleChange}
                    minRows={6}
                    multiline
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <TextField
                    name="owner_id"
                    title="Owner id"
                    value={project.owner_id}
                    isLoading={project.isLoading}
                    disabled
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <TextField
                    name="id"
                    title="Project id"
                    value={project.id}
                    isLoading={project.isLoading}
                    disabled
                  />
                </MuiGrid>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid item xs={12}>
          <MuiDivider />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <MuiGrid container>
            <MuiGrid item xs={12} md={4}>
              <MuiTypography variant="body2" sx={{ fontWeight: 600 }}>
                Detailed Information:
              </MuiTypography>
            </MuiGrid>
            <MuiGrid item xs={12} md={8}>
              <MuiGrid container columnSpacing={2} rowSpacing={3}>
                <MuiGrid item xs={12}>
                  <TextField
                    isLoading={project.isLoading}
                    name="created_at"
                    title="Creation date"
                    helperText="This project was created on this day."
                    value={
                      project.created_at
                        ? format(parseISO(project.created_at), "PPPPpppp")
                        : "loading"
                    }
                    disabled
                  />
                </MuiGrid>
                <MuiGrid item xs={12} md={6}>
                  <ProjectStatusSelector
                    title="Status"
                    helperText="The current status of your project."
                    value={project.status}
                    handleChange={handleChange}
                  />
                </MuiGrid>
                <MuiGrid item xs={6}></MuiGrid>
                <MuiGrid item xs={12} md={6}>
                  <DatePicker
                    title="Start Date"
                    name="start_date"
                    helperText="The day your project started."
                    isLoading={project.isLoading}
                    value={parseISO(project.start_date)}
                    maxDate={parseISO(project.end_date)}
                    onChange={(date) =>
                      dispatch(updateProject({ start_date: formatISO(date) }))
                    }
                    handleChange={handleChange}
                  />
                </MuiGrid>
                <MuiGrid item xs={12} md={6}>
                  <DatePicker
                    isLoading={project.isLoading}
                    title="End Date"
                    name="end_date"
                    value={parseISO(project.end_date)}
                    minDate={parseISO(project.start_date)}
                    helperText="The day your project will end. (due date)"
                    onChange={(date) =>
                      dispatch(updateProject({ end_date: formatISO(date) }))
                    }
                    handleChange={handleChange}
                  />
                </MuiGrid>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid item xs={12} sx={{ marginBottom: 8 }}>
          <MuiGrid container>
            <MuiGrid item md={4}></MuiGrid>
            <MuiGrid item md={8}>
              <PrimaryButton type="submit" label="Save Changes" />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default ProjectSettings;
