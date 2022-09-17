import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format, formatISO, parse, parseISO } from "date-fns";
import { updateProject } from "../../project.slice";
import { setSnackbarOpen } from "../../../snackbar.reducer";
import { useUpdateProjectMutation } from "../../project.api";
import ProjectStatusSelector from "../ProjectStatusSelector";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiDivider from "@mui/material/Divider";
import MuiTypography from "@mui/material/Typography";
import TabPanel from "../../../../common/TabPanel";
import TextField from "../../../../common/TextField";
import DatePicker from "../../../../common/DatePicker";

const ProjectSettings = () => {
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();
  const [updateProjectRequest, { isSuccess }] = useUpdateProjectMutation();
  const project = useSelector((store) => store.project.info);

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateProject({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, status, end_date, start_date } = project;
    await updateProjectRequest({
      uid: project.id,
      payload: { name, description, status, end_date, start_date },
    });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [isSuccess]);

  return (
    <TabPanel selectedTab={selectedTab} index={4}>
      <MuiGrid container onSubmit={handleSubmit} component="form" gap="20px">
        <MuiGrid item xs={12}>
          <MuiGrid container>
            <MuiGrid item xs={12} md={4}>
              <MuiTypography variant="body1" sx={{ fontWeight: "bold" }}>
                Basic Information
              </MuiTypography>
            </MuiGrid>
            <MuiGrid item xs={12} md={8}>
              <MuiGrid container spacing={2}>
                <MuiGrid item xs={12}>
                  <TextField
                    name="name"
                    title="Name"
                    value={project.name}
                    onChange={handleChange}
                    required
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <TextField
                    name="owner_uid"
                    title="Owner UID"
                    value={project.owner_uid}
                    disabled
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <TextField
                    name="id"
                    title="Project ID"
                    value={project.id}
                    disabled
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <TextField
                    name="description"
                    title="Description"
                    value={project.description}
                    onChange={handleChange}
                    helperText="A free text description of the project. Max character count is 150"
                    rows={4}
                    multiline
                  />
                </MuiGrid>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
          <MuiDivider />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <MuiGrid container>
            <MuiGrid item xs={12} md={4}>
              <MuiTypography variant="body1" sx={{ fontWeight: "bold" }}>
                Detailed Information
              </MuiTypography>
            </MuiGrid>
            <MuiGrid item xs={12} md={8}>
              <MuiGrid container spacing={2}>
                <MuiGrid item xs={12}>
                  <TextField
                    name="creation_date"
                    title="Created At"
                    value={
                      project.creation_date
                        ? format(parseISO(project.creation_date), "PPPPpppp")
                        : "loading"
                    }
                    helperText="The day this project was created, this cannot be changed."
                    disabled
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <ProjectStatusSelector
                    title="Status"
                    value={project.status}
                    helperText="The current status of your project."
                    handleChange={handleChange}
                  />
                </MuiGrid>
                <MuiGrid item xs={12} md={6}>
                  <DatePicker
                    title="Start Date"
                    name="start_date"
                    value={parseISO(project.start_date)}
                    maxDate={parseISO(project.end_date)}
                    helperText="The day your project started."
                    onChange={(date) =>
                      dispatch(updateProject({ start_date: formatISO(date) }))
                    }
                    handleChange={handleChange}
                  />
                </MuiGrid>
                <MuiGrid item xs={12} md={6}>
                  <DatePicker
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
              <MuiButton
                type="submit"
                variant="contained"
                sx={{ textTransform: "none", fontWeight: "bold" }}
              >
                Save Changes
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default ProjectSettings;
