import { connect } from "react-redux";
import { Edit2 } from "react-feather";
import { updateIssue } from "../../redux/issue/issue.action-creator";
import { updateProject } from "../../redux/project/project.action-creator";
import { setSnackbarOpen } from "../../redux/snackbar/snackbar.action-creator";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const PageDescription = (props) => {
  const { page, type, dispatch } = props;

  const handleChange = (e) => {
    if (type === "project")
      dispatch(updateProject({ description: e.target.value }));
    if (type === "issue")
      dispatch(updateIssue({ description: e.target.value }));
  };

  const handleSave = () => {
    if (page.description !== page.previousValue) {
      if (type === "project") {
        fetch(`http://localhost:4000/api/projects/${page.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            field: "description",
            value: page.description,
          }),
        }).then((response) => {
          if (response.status === 200) dispatch(setSnackbarOpen());
        });
      }

      if (type === "issue") {
        fetch(`http://localhost:4000/api/issues/${page.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            field: "description",
            value: page.description,
          }),
        }).then((response) => {
          if (response.status === 200) dispatch(setSnackbarOpen());
        });
      }
    }
    dispatch(updateIssue({ descriptionSelected: false }));
    dispatch(updateProject({ descriptionSelected: false }));
  };

  return (
    <Grid container>
      <Grid item sm={12} sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="h6"
          sx={{
            marginRight: 0.5,
            fontWeight: "bold",
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
            ":hover": {
              color: "primary.main",
            },
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
            InputProps={{
              style: {
                color: "primary.text",
                fontSize: "14px",
              },
            }}
          />
        ) : (
          <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
            {page.description}
          </Typography>
        )}
      </Grid>
      {/* edit buttons */}
      {page.descriptionSelected && (
        <Grid item sm={12} sx={{ marginTop: 1 }}>
          <Button
            variant={"contained"}
            onClick={handleSave}
            sx={{
              boxShadow: "none",
              textTransform: "none",
              ":hover": { boxShadow: "none" },
            }}
          >
            <Typography variant="body2">Save</Typography>
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
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (store) => {
  return {
    project: store.project,
  };
};

export default connect(mapStateToProps)(PageDescription);
