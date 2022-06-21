import { useDispatch, useSelector } from "react-redux";
import { setProject, updateProject } from "../../reducers/project.reducer";
import { setIssue, updateIssue } from "../../reducers/issue.reducer";
import { setSnackbarOpen } from "../../reducers/snackbar.reducer";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";
import { Edit2 } from "react-feather";

const PageTitle = ({ type }) => {
  const dispatch = useDispatch();
  const project = useSelector((store) => store.project);
  const issue = useSelector((store) => store.issue);

  let page;
  if (type === "project") page = project;
  if (type === "issue") page = issue;

  const { nameSelected } = page;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // 1. update value in the redux store on typing in the TextField
    if (type === "project") dispatch(updateProject({ [name]: value }));
    if (type === "issue") dispatch(updateIssue({ [name]: value }));
  };

  const handleSave = () => {
    if (page.name !== page.previousName) {
      // 2. On clicking save button send update request to server on project or issue?
      if (type === "project") {
        fetch(`http://localhost:4000/api/projects/${page.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ["name"]: page.name }),
        }).then((response) => {
          if (response.status === 200) dispatch(setSnackbarOpen(true));
        });
      }
      if (type === "issue") {
        fetch(
          `http://localhost:4000/api/issues/${page.id}/?projectId=${page.projectId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ["name"]: page.name }),
          }
        ).then((response) => {
          if (response.status === 200) dispatch(setSnackbarOpen(true));
        });
      }
    }
    dispatch(updateProject({ nameSelected: false }));
    dispatch(updateIssue({ nameSelected: false }));
  };

  return (
    <Box sx={{ paddingBottom: 1 }}>
      {nameSelected ? (
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            autoFocus
            name="name"
            value={page.name}
            onChange={handleChange}
            variant="standard"
            inputProps={{
              style: { fontSize: "2rem", fontWeight: "bold" },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              boxShadow: "none",
              marginLeft: "5px",
              textTransform: "none",
              ":hover": { boxShadow: "none" },
            }}
          >
            <Typography variant="body2">Save</Typography>
          </Button>
          <Button
            onClick={() => {
              // 3. On clicking cancel set name=previousName and set selected value to false
              if (type === "project")
                dispatch(
                  setProject({ name: page.previousName, nameSelected: false })
                );
              if (type === "issue")
                dispatch(
                  setIssue({ name: page.previousName, nameSelected: false })
                );
            }}
            sx={{
              color: "primary.text",
              textTransform: "none",
              marginLeft: "5px",
              backgroundColor: "background.main",
              ":hover": { backgroundColor: "background.main2" },
            }}
          >
            <Typography variant="body2">Cancel</Typography>
          </Button>
        </Box>
      ) : (
        <Typography
          sx={{ fontSize: "1.875rem", fontWeight: "bold", color: "text.main" }}
        >
          {page.name}
          <IconButton
            onClick={() => {
              // 4. On clicking edit button update selected value to true
              if (type === "project")
                dispatch(
                  updateProject({ previousName: page.name, nameSelected: true })
                );
              if (type === "issue")
                dispatch(
                  updateIssue({ previousName: page.name, nameSelected: true })
                );
            }}
            sx={{
              color: "background.main3",
              ":hover": { color: "primary.main" },
            }}
          >
            <Edit2 width="24px" height="24px" />
          </IconButton>
        </Typography>
      )}
    </Box>
  );
};
export default PageTitle;
