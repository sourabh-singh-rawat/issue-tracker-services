import { useState } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateProject = (props) => {
  const { uid, email = "No owner" } = props;
  const [open, setOpen] = useState(false);
  const [projectFields, setProjectFields] = useState({
    name: "",
    description: "",
    uid,
    email,
    startDate: null,
    endDate: null,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(projectFields);
    // TODO: send to backend
    await fetch("http://localhost:4000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectFields),
    });
  };

  const handleChange = (e) => {
    const { name } = e.target;
    setProjectFields({ ...projectFields, [name]: e.target.value });
  };

  return (
    <Box>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
        Create
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box>
          <LinearProgress color="secondary" sx={{ display: "none" }} />
          <Box sx={style} component="form" onSubmit={handleSubmit}>
            <Grid container columnSpacing={2} rowSpacing={1}>
              <Grid item sm={12} paddingBottom="1em">
                <Typography variant="h4">Create Project</Typography>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  name="name"
                  label="Project Name"
                  variant="outlined"
                  margin="dense"
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  label="description"
                  name="description"
                  rows={4}
                  margin="dense"
                  onChange={handleChange}
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  name="email"
                  label="Owner"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  autoFocus={true}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item sm={12}></Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="startDate"
                  label="Start Date"
                  type="date"
                  margin="dense"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} paddingBottom="1em">
                <TextField
                  name="endDate"
                  label="End Date"
                  type="date"
                  margin="dense"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" type="submit" fullWidth>
                  Create Project
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="outlined" onClick={handleClose} fullWidth>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    uid: state.user.uid,
    email: state.user.email,
  };
};
export default connect(mapStateToProps)(CreateProject);
