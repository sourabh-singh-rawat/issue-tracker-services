import { connect } from "react-redux";
import {
  setProject,
  updateProject,
} from "../../redux/project/project.action-creator";
import { setIssue, updateIssue } from "../../redux/issue/issue.action-creator";
import { setSnackbarOpen } from "../../redux/snackbar/snackbar.action-creator";
import { Edit2 } from "react-feather";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";

const PageTitle = (props) => {
  const { page, dispatch, projectId, type } = props;
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
        fetch(`http://localhost:4000/api/projects/${projectId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            field: "name",
            value: page.name,
          }),
        }).then((response) => {
          if (response.status === 200) dispatch(setSnackbarOpen());
        });
      }
      if (type === "issue") {
        fetch(
          `http://localhost:4000/api/issues/${page.id}/?projectId=${page.projectId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              field: "name",
              value: page.name,
            }),
          }
        ).then((response) => {
          if (response.status === 200) dispatch(setSnackbarOpen());
        });
      }
    }
    dispatch(updateProject({ nameSelected: false }));
    dispatch(updateIssue({ nameSelected: false }));
  };

  return (
    <>
      {nameSelected ? (
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            autoFocus
            name="name"
            value={page.name}
            onChange={handleChange}
            variant="standard"
            inputProps={{
              style: {
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
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
                  setProject({
                    name: page.previousName,
                    nameSelected: false,
                  })
                );
              if (type === "issue")
                dispatch(
                  setIssue({
                    name: page.previousName,
                    nameSelected: false,
                  })
                );
            }}
            sx={{
              color: "primary.text",
              textTransform: "none",
              marginLeft: "5px",
              backgroundColor: "background.main",
              ":hover": {
                backgroundColor: "background.main2",
              },
            }}
          >
            <Typography variant="body2">Cancel</Typography>
          </Button>
        </Box>
      ) : (
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "primary.text2" }}
        >
          {page.name}
          <IconButton
            onClick={() => {
              // 4. On clicking edit button update selected value to true
              if (type === "project")
                dispatch(
                  updateProject({
                    previousName: page.name,
                    nameSelected: true,
                  })
                );
              if (type === "issue")
                dispatch(
                  updateIssue({
                    previousName: page.name,
                    nameSelected: true,
                  })
                );
            }}
            sx={{
              color: "background.main3",
              ":hover": {
                color: "primary.main",
              },
            }}
          >
            <Edit2 width="24px" height="24px" />
          </IconButton>
        </Typography>
      )}
    </>
  );
};

const mapStateToProps = (store) => {
  return {
    snackbar: store.snackbar,
  };
};

export default connect(mapStateToProps)(PageTitle);
