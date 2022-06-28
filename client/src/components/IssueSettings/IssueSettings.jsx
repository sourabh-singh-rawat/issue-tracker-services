import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { useOutletContext } from "react-router-dom";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { updateIssue } from "../../reducers/issue.reducer";
import { setSnackbarOpen } from "../../reducers/snackbar.reducer";
import StyledSelect from "../StyledSelect/StyledSelect";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";
import StyledTextField from "../StyledTextField/StyledTextField";
import { useEffect } from "react";
import {
  setIssueStatus,
  setIssuePriority,
} from "../../reducers/issueOptions.reducer";

const IssueSettings = () => {
  const dispatch = useDispatch();
  const issue = useSelector((store) => store.issue);
  const [selectedTab] = useOutletContext();
  const issueStatus = useSelector((store) => store.issueOptions.issueStatus);
  const issuePriority = useSelector(
    (store) => store.issueOptions.issuePriority
  );

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateIssue({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, status, due_date, reporter } = issue;
    const response = await fetch(
      `http://localhost:4000/api/issues/${issue.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          status,
        }),
      }
    );

    if (response.status === 200) dispatch(setSnackbarOpen(true));
  };

  useEffect(() => {
    const fetchIssueStatus = async () => {
      const response = await fetch("http://localhost:4000/api/issues/status");
      const status = await response.json();

      dispatch(setIssueStatus(status));
    };

    const fetchIssuePriority = async () => {
      const response = await fetch("http://localhost:4000/api/issues/priority");
      const priority = await response.json();

      dispatch(setIssuePriority(priority));
    };

    fetchIssueStatus();
    fetchIssuePriority();
  }, []);

  return (
    <StyledTabPanel selectedTab={selectedTab} index={2}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container sx={{ marginTop: 3 }}>
          <Grid item className="lhs" xs={12} md={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Basic Information
            </Typography>
          </Grid>
          <Grid item className="rhs" xs={12} md={8}>
            <Grid container>
              <Grid item xs={12}>
                <StyledTextField
                  name="name"
                  title="Name"
                  value={issue.name}
                  onChange={handleChange}
                  helperText="A name for your issue"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  name="id"
                  title="Issue ID"
                  value={issue.id}
                  helperText="This is the UID of the issue owner"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  name="id"
                  title="Project ID"
                  value={issue.project_id}
                  helperText="This is the Project ID."
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  name="description"
                  title="Description"
                  value={issue.description}
                  onChange={handleChange}
                  helperText="A text description of the project. Max character count is 150"
                  rows={4}
                  multiline
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid container sx={{ marginTop: 3 }}>
          <Grid item className="lhs" xs={12} md={4}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Detailed Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <StyledTextField
                  name="creation_date"
                  title="Created At"
                  value={
                    issue.creation_date
                      ? format(parseISO(issue.creation_date), "PPPPpppp")
                      : "loading"
                  }
                  helperText="The day this project was created, this cannot be changed."
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <StyledSelect
                  title="Status"
                  name="status"
                  value={issue.status}
                  onChange={handleChange}
                  helperText="The current status of the issue."
                  // onChange={handleChange}
                  items={issueStatus}
                />
              </Grid>
              <Grid item xs={6}>
                <StyledSelect
                  title="Priority"
                  name="priority"
                  value={issue.priority}
                  onChange={handleChange}
                  helperText="The current status of your issue."
                  // onChange={handleChange}
                  items={issuePriority}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <StyledDatePicker
                  title="Start Date"
                  name="start_date"
                  value={startDate}
                  maxDate={endDate}
                  helperText="The day your project started."
                  onChange={(date) =>
                    dispatch(updateProject({ start_date: date }))
                  }
                  handleChange={handleChange}
                />
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <StyledDatePicker
                  title="End Date"
                  name="end_date"
                  value={endDate}
                  minDate={startDate}
                  helperText="The day your project will end. (due date)"
                  onChange={(date) =>
                    dispatch(updateProject({ end_date: date }))
                  }
                  handleChange={handleChange}
                />
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: 3, marginBottom: 8 }}>
          <Grid item md={4}></Grid>
          <Grid item md={8}>
            <Button
              variant="contained"
              type="submit"
              sx={{ textTransform: "none", fontWeight: "bold" }}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </StyledTabPanel>
  );
};
export default IssueSettings;
