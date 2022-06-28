import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import StyledTextField from "../StyledTextField/StyledTextField";
import { Add } from "@mui/icons-material";
import StyledSelect from "../StyledSelect/StyledSelect";
import { useEffect } from "react";
import { setProjectMemberRoles } from "../../reducers/projectOptions.reducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const AddProjectMemberButton = () => {
  const dispatch = useDispatch();
  const projectMemberRoles = useSelector(
    (store) => store.projectOptions.projectMemberRoles
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formFields, setFormFields] = useState({ email: "", role: 0 });
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formFields);
  };

  useEffect(() => {
    const fetchProjectMemberRoles = async () => {
      const response = await fetch(
        `http://localhost:4000/api/projects/members/roles`
      );
      const roles = await response.json();
      dispatch(setProjectMemberRoles(roles));
    };
    fetchProjectMemberRoles();
  }, []);

  return (
    <Box>
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
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" fontWeight="bold">
                Invite new members
              </Typography>
              <Typography variant="body1">
                Send invitation links to team members
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <StyledTextField
                title="Email"
                name="email"
                placeholder="contact@email.com"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={4}>
              <StyledSelect
                displayEmpty
                name="role"
                title="Role"
                items={projectMemberRoles}
                value={formFields.role}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ textTransform: "none" }}
                type="submit"
              >
                Send Invite
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddProjectMemberButton;
