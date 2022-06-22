import { useDispatch, useSelector } from "react-redux";
import { Edit2 } from "react-feather";
import { updateIssue } from "../../reducers/issue.reducer";
import { updateProject } from "../../reducers/project.reducer";
import { setSnackbarOpen } from "../../reducers/snackbar.reducer";
import { Grid, Button, IconButton, Typography, TextField } from "@mui/material";

const PageDescription = ({ type }) => {
  const dispatch = useDispatch();
  const project = useSelector((store) => store.project);
  const issue = useSelector((store) => store.issue);

  let page;
  if (type === "project") page = project;
  if (type === "issue") page = issue;

  const handleChange = (e) => {
    if (type === "project")
      dispatch(updateProject({ description: e.target.value }));
    if (type === "issue")
      dispatch(updateIssue({ description: e.target.value }));
  };

  const handleSave = async () => {
    if (page.description !== page.previousValue) {
      if (type === "project") {
        const response = await fetch(
          `http://localhost:4000/api/projects/${page.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: page.description }),
          }
        );

        if (response.status === 200) dispatch(setSnackbarOpen(true));
      }

      if (type === "issue") {
        const response = await fetch(
          `http://localhost:4000/api/issues/${page.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: page.description }),
          }
        );
        if (response.status === 200) dispatch(setSnackbarOpen(true));
      }
    }
    dispatch(updateIssue({ descriptionSelected: false }));
    dispatch(updateProject({ descriptionSelected: false }));
  };

  return (
    <Grid container>
      <Grid item sm={12} sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "text.main",
          }}
        >
          Description
        </Typography>
        <IconButton
          onClick={() => {
            if (type === "project")
              dispatch(
                updateProject({
                  descriptionSelected: true,
                  previousValue: page.description,
                })
              );
            if (type === "issue")
              dispatch(
                updateIssue({
                  descriptionSelected: true,
                  previousValue: page.description,
                })
              );
          }}
          sx={{
            color: "background.main3",
            ":hover": { color: "primary.main" },
          }}
        >
          <Edit2 width="24px" height="24px" />
        </IconButton>
      </Grid>
      <Grid item sm={12} md={6}>
        {page.descriptionSelected ? (
          <TextField
            value={page.description}
            onChange={handleChange}
            autoFocus
            multiline
            fullWidth
          />
        ) : (
          <Typography variant="body1">{page.description}</Typography>
        )}
      </Grid>
      {/* edit buttons */}
      {page.descriptionSelected && (
        <Grid item sm={12} sx={{ marginTop: 1 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              boxShadow: "none",
              textTransform: "none",
              ":hover": { boxShadow: "none" },
            }}
          >
            <Typography variant="body1">Save</Typography>
          </Button>
          <Button
            onClick={() => {
              if (type === "project")
                dispatch(
                  updateProject({
                    descriptionSelected: false,
                    description: page.previousValue,
                  })
                );

              if (type === "issue")
                dispatch(
                  updateIssue({
                    descriptionSelected: false,
                    description: page.previousValue,
                  })
                );
            }}
            sx={{
              color: "text.main",
              textTransform: "none",
              marginLeft: "5px",
              backgroundColor: "transparent",
              ":hover": { backgroundColor: "primary.dark" },
            }}
          >
            <Typography variant="body1">Cancel</Typography>
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default PageDescription;
