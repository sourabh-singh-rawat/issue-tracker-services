import { useState } from "react";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import StyledTextField from "../StyledTextField/StyledTextField";
import { Add } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const ProjectMemberFormModel = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ textTransform: "none" }}
        startIcon={<Add />}
      >
        Add Member
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          ".MuiBackdrop-root": {
            backgroundColor: "rgba(9, 30, 66, 0.54)",
          },
        }}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight="bold">
                Invite a teammate
              </Typography>
              <Typography variant="body1">
                Invite a person to this project
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                title="Email"
                name="email"
                placeholder="contact@email.com"
              />
              <Button variant="contained" sx={{ textTransform: "none" }}>
                Send Invite
              </Button>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectMemberFormModel;
