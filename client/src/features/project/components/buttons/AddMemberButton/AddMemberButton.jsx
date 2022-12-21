import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiModal from "@mui/material/Modal";
import MuiTypography from "@mui/material/Typography";

import Select from "../../../../../common/selects/Select";
import TextField from "../../../../../common/textfields/TextField";
import PrimaryButton from "../../../../../common/buttons/PrimaryButton";

import { setMemberRoles } from "../../../slice/project.slice";
import {
  useGetRolesQuery,
  useSendInviteMutation,
} from "../../../api/project.api";

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

const AddMemberButton = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [members, setMembers] = useState([]);
  const [formFields, setFormFields] = useState({
    email: "",
    role_id: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const memberRoles = useSelector((store) => store.project.options.roles.rows);

  const roles = useGetRolesQuery();
  const [sendInvite] = useSendInviteMutation();

  useEffect(() => {
    if (roles.data) dispatch(setMemberRoles(roles.data));
  }, [roles.data]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setMembers([value]);
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendInvite({ id, payload: formFields });
  };

  return (
    <Fragment>
      <PrimaryButton label="Add Member" onClick={handleOpen} />
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
                fontWeight={500}
                sx={{ paddingBottom: 1 }}
              >
                Email
              </MuiTypography>
              <TextField
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
                name="role_id"
                title="Role"
                items={memberRoles}
                value={formFields.role}
                onChange={onChange}
                displayEmpty
              />
            </MuiGrid>
            <MuiGrid item xs={12}>
              <PrimaryButton label="Send Invite" type="submit" />
            </MuiGrid>
          </MuiGrid>
        </MuiBox>
      </MuiModal>
    </Fragment>
  );
};

export default AddMemberButton;
