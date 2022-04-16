import { useState } from "react";
import { Grid, Box, Button, Modal, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateProject = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box component="div">
      <Button color="primary" startIcon={<AddIcon />} onClick={handleOpen}>
        Create
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container columnSpacing={2} rowSpacing={1}>
            <Grid item sm={12} paddingBottom="1em">
              <Typography variant="h4">Create Project</Typography>
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Project Name"
                variant="outlined"
                margin="dense"
                required
                fullWidth
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Owner"
                variant="outlined"
                margin="normal"
                value={"John Doe"}
                autoFocus={true}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item sm={12}></Grid>

            <Grid item sm={6}>
              <TextField
                label="Start Date"
                type="date"
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item sm={6} paddingBottom="1em">
              <TextField
                label="End Date"
                type="date"
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item sm={6}>
              <Button variant="contained" fullWidth>
                Create Project
              </Button>
            </Grid>
            <Grid item sm={6}>
              <Button variant="outlined" onClick={handleClose} fullWidth>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateProject;
