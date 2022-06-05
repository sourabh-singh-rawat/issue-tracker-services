import { useState } from "react";
import { connect } from "react-redux";
import { Edit2 } from "react-feather";
import { updateProject } from "../../redux/project/project.action-creator";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";

const PageDescription = (props) => {
  const { page, type, dispatch } = props;

  // snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // snackbar action
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackbarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handleChange = (e) => {
    if (type === "project")
      dispatch(updateProject({ description: e.target.value }));
  };

  const handleSave = () => {
    if (page.description !== page.previousValue) {
      if (type === "project")
        fetch(`http://localhost:4000/api/project/${page.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            field: "description",
            value: page.description,
          }),
        }).then((response) => {
          if (response.status === 200) setSnackbarOpen(true);
        });

      dispatch(updateProject({ descriptionSelected: false }));
    }
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
            Save
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
      {/* snackbar updated */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        action={action}
        onClose={handleSnackbarClose}
        message="Updated"
      />
    </Grid>
  );
};

const mapStateToProps = (store) => {
  return {
    project: store.project,
  };
};

export default connect(mapStateToProps)(PageDescription);
