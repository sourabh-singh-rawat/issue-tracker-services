import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format, formatISO, parseISO } from "date-fns";

import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiDivider from "@mui/material/Divider";
import MuiSkeleton from "@mui/material/Skeleton";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/TabPanel";
import TextField from "../../../../common/TextField";
import DatePicker from "../../../../common/DatePicker";

import IssueStatusSelector from "../IssueStatusSelector/IssueStatusSelector";
import IssuePrioritySelector from "../IssuePrioritySelector/IssuePrioritySelector";

import { setSnackbarOpen } from "../../../snackbar.reducer";
import { updateIssue } from "../../issue.slice";
import { useUpdateIssueMutation } from "../../issue.api";

const IssueSettings = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedTab] = useOutletContext();
  const [updateIssueMutation, { isSuccess, data }] = useUpdateIssueMutation();
  const issue = useSelector((store) => store.issue.info);

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateIssue({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, status, priority, due_date, reporter } = issue;
    updateIssueMutation({
      id,
      body: { name, description, status, priority, due_date, reporter },
    });
  };

  useEffect(() => {
    if (isSuccess) dispatch(setSnackbarOpen(true));
  }, [data]);

  return (
    <TabPanel selectedTab={selectedTab} index={3}>
      <MuiGrid
        container
        component="form"
        rowSpacing={2}
        onSubmit={handleSubmit}
      >
        <MuiGrid item xs={12}>
          <MuiGrid container rowSpacing={2}>
            <MuiGrid item xs={12} md={4}>
              <MuiTypography variant="body1" sx={{ fontWeight: 600 }}>
                Basic Information:
              </MuiTypography>
              <MuiTypography variant="body2" sx={{ fontWeight: 400 }}>
                General information about your project.
              </MuiTypography>
            </MuiGrid>
            <MuiGrid item xs={12} md={8}>
              <MuiGrid container rowSpacing={3}>
                <MuiGrid item xs={12}>
                  <TextField
                    name="name"
                    title="Name"
                    value={issue.name}
                    loading={issue.loading}
                    onChange={handleChange}
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <TextField
                    name="id"
                    title="Issue ID"
                    value={issue.id}
                    loading={issue.loading}
                    disabled
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <TextField
                    name="id"
                    title="Project ID"
                    value={issue.project_id}
                    loading={issue.loading}
                    disabled
                  />
                </MuiGrid>
                <MuiGrid item xs={12}>
                  <TextField
                    name="description"
                    title="Description"
                    helperText="A text description of the project. Max character count is 150"
                    value={issue.description}
                    loading={issue.loading}
                    onChange={handleChange}
                    minRows={6}
                    multiline
                  />
                </MuiGrid>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
          <MuiDivider sx={{ marginTop: 2 }} />
        </MuiGrid>
        <MuiGrid item xs={12}>
          <MuiGrid container rowSpacing={2}>
            <MuiGrid item xs={12} md={4}>
              <MuiTypography variant="body1" sx={{ fontWeight: 600 }}>
                Issue Properties:
              </MuiTypography>
              <MuiTypography variant="body2" sx={{ fontWeight: 400 }}>
                General information about your project.
              </MuiTypography>
            </MuiGrid>
            <MuiGrid item xs={12} md={8}>
              <MuiGrid container spacing={3}>
                <MuiGrid item xs={12}>
                  <TextField
                    name="creation_date"
                    title="Creation Date"
                    helperText="The day this project was created, this cannot be changed."
                    value={
                      issue.creation_date
                        ? format(parseISO(issue.creation_date), "PPPPpppp")
                        : "loading"
                    }
                    loading={issue.loading}
                    disabled
                  />
                </MuiGrid>
                <MuiGrid item xs={6}>
                  <IssueStatusSelector
                    title="Status"
                    name="status"
                    helperText="The current status of issue."
                    value={issue.status}
                    loading={issue.loading}
                    handleChange={handleChange}
                  />
                </MuiGrid>
                <MuiGrid item xs={6}>
                  <IssuePrioritySelector
                    title="Priority"
                    name="priority"
                    helperText="The current priority of issue."
                    value={issue.priority}
                    loading={issue.loading}
                    handleChange={handleChange}
                  />
                </MuiGrid>
                <MuiGrid item xs={12} md={6}>
                  <DatePicker
                    title="Due Date"
                    name="due_date"
                    value={issue.due_date ? parseISO(issue.due_date) : null}
                    loading={issue.loading}
                    onChange={(date) => {
                      dispatch(updateIssue({ due_date: formatISO(date) }));
                    }}
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
            <MuiGrid item xs={12} md={8}>
              {issue.loading ? (
                <MuiSkeleton width="20%" />
              ) : (
                <MuiButton
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Save Changes
                </MuiButton>
              )}
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default IssueSettings;
