import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { format, formatISO, parseISO } from "date-fns";
import { Button, Divider, Grid, Typography } from "@mui/material";

import TabPanel from "../../../../common/TabPanel";
import TextField from "../../../../common/TextField";
import DatePicker from "../../../../common/DatePicker";

import IssueStatusSelector from "../IssueStatusSelector/IssueStatusSelector";
import IssuePrioritySelector from "../IssuePrioritySelector/IssuePrioritySelector";

import { setSnackbarOpen } from "../../../snackbar.reducer";
import {
  updateIssue,
  setIssueStatus,
  setIssuePriority,
} from "../../issue.slice";
import {
  useGetIssuesStatusQuery,
  useGetIssuesPriorityQuery,
  useUpdateIssueMutation,
} from "../../issue.api";

const IssueSettings = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [updateIssueMutation, { isSuccess }] = useUpdateIssueMutation();
  const [selectedTab] = useOutletContext();
  const status = useGetIssuesStatusQuery();
  const priority = useGetIssuesPriorityQuery();
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
  }, [isSuccess]);

  useEffect(() => {
    if (status.data) dispatch(setIssueStatus(status.data));
    if (priority.data) dispatch(setIssuePriority(priority.data));
  }, [status.data, priority.data, issue]);

  return (
    <TabPanel selectedTab={selectedTab} index={3}>
      <Grid
        container
        component="form"
        onSubmit={handleSubmit}
        gap="20px"
        rowSpacing={2}
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Basic Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    title="Name"
                    value={issue.name}
                    onChange={handleChange}
                    helperText="A name for your issue"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="id"
                    title="Issue ID"
                    value={issue.id}
                    helperText="This is Issue Id"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="id"
                    title="Project ID"
                    value={issue.project_id}
                    helperText="This is the Project Id"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
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
          <Divider sx={{ marginTop: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Detailed Information
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
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
                  <IssueStatusSelector
                    title="Status"
                    name="status"
                    value={issue.status}
                    handleChange={handleChange}
                    helperText="The current status of the issue."
                  />
                </Grid>
                <Grid item xs={6}>
                  <IssuePrioritySelector
                    title="Priority"
                    name="priority"
                    value={issue.priority}
                    handleChange={handleChange}
                    helperText="The current priority of this issue."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    title="Due Date"
                    name="due_date"
                    value={issue.due_date ? parseISO(issue.due_date) : null}
                    onChange={(date) => {
                      dispatch(updateIssue({ due_date: formatISO(date) }));
                    }}
                    handleChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 8 }}>
          <Grid container>
            <Grid item md={4}></Grid>
            <Grid item md={8}>
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default IssueSettings;
