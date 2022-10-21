import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiModal from "@mui/material/Modal";
import MuiButton from "@mui/material/Button";
import MuiTextField from "@mui/material/TextField";
import MuiTypography from "@mui/material/Typography";
import MuiAddIcon from "@mui/icons-material/Add";

import Select from "../../../../common/Select";

import { setMemberRoles } from "../../project.slice";
import { useGetRolesQuery, useSendInviteMutation } from "../../project.api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "6px",
  p: 4,
};

const InviteButton = () => {
  const dispatch = useDispatch();
  const roles = useGetRolesQuery();
  const memberRoles = useSelector((store) => store.project.options.roles.rows);
  const { id } = useParams();
  const [sendInvite] = useSendInviteMutation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [members, setMembers] = useState([]);

  const [formFields, setFormFields] = useState({ email: "", role: "MEMBER" });
  const onChange = (e) => {
    const { name, value } = e.target;
    setMembers([value]);
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendInvite({ id, payload: formFields });
  };

  useEffect(() => {
    if (roles.data) dispatch(setMemberRoles(roles.data));
  }, [roles.data]);

  return (
    <Fragment>
      <MuiButton
        variant="contained"
        onClick={handleOpen}
        sx={{ textTransform: "none" }}
        startIcon={<MuiAddIcon />}
        fullWidth
      >
        Add Member
      </MuiButton>
      <MuiModal
        open={open}
        onClose={handleClose}
        sx={{
          ".MuiBackdrop-root": { backgroundColor: "rgba(9, 30, 66, 0.54)" },
        }}
      >
        <MuiBox sx={style} component="form" onSubmit={handleSubmit}>
          <MuiGrid container spacing={2}>
            <MuiGrid item xs={12}>
              <MuiTypography variant="h5" fontWeight="bold">
                Invite new members
              </MuiTypography>
              <MuiTypography variant="body2">
                Send invitation links to team members
              </MuiTypography>
            </MuiGrid>
            <MuiGrid item xs={8}>
              <MuiTypography
                variant="body2"
                fontWeight="bold"
                sx={{ paddingBottom: 1 }}
              >
                Email
              </MuiTypography>
              <MuiTextField
                name="email"
                size="small"
                placeholder="contact@email.com"
                onChange={onChange}
                sx={{ input: { fontSize: "14px" } }}
                fullWidth
              />
            </MuiGrid>
            <MuiGrid item xs={4}>
              <Select
                name="role"
                title="Role"
                items={memberRoles}
                value={formFields.role}
                onChange={onChange}
                displayEmpty
              />
            </MuiGrid>
            <MuiGrid item xs={12}>
              <MuiButton
                variant="contained"
                sx={{ textTransform: "none" }}
                type="submit"
              >
                Send Invite
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </MuiBox>
      </MuiModal>
    </Fragment>
  );
};

export default InviteButton;
