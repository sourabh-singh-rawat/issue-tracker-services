import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";

import TextField from "../../../../common/textfields/TextField";
import SectionHeader from "../../../../common/headers/SectionHeader";

import { useCreateTeamMutation } from "../../api/team.api";

import { setMessageBarOpen } from "../../../message-bar/slice/message-bar.slice";

const TeamForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createTeamMutation, { isSuccess, data }] = useCreateTeamMutation();
  const [formFields, setFormFields] = useState({ name: "", description: "" });

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormFields({ ...formFields, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    createTeamMutation({ body: formFields });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setMessageBarOpen(true));
      navigate(`/teams/${data.id}/overview`);
    }
  }, [isSuccess]);

  return (
    <MuiGrid container gap="20px">
      <MuiGrid item xs={12}>
        <SectionHeader
          title="Create Team"
          subtitle="Create teams to organize people involved with your project."
        />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <MuiBox component="form">
          <MuiGrid container rowSpacing="20px" columnSpacing={4}>
            <MuiGrid item xs={12}>
              <TextField
                name="name"
                title="Name"
                helperText="The name for your team."
                onChange={handleChange}
                required
              />
            </MuiGrid>
            <MuiGrid item xs={12}>
              <TextField
                name="description"
                title="Description"
                helperText="A text description of your team. Max character count is 150."
                onChange={handleChange}
                rows={4}
                multiline
              />
            </MuiGrid>
            <MuiGrid item xs={12}>
              <MuiGrid container marginTop={2}>
                <MuiGrid item>
                  <MuiButton
                    type="submit"
                    variant="contained"
                    sx={{ textTransform: "none", fontWeight: 600 }}
                    onClick={handleSubmit}
                    fullWidth
                  >
                    Create Team
                  </MuiButton>
                </MuiGrid>
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
        </MuiBox>
      </MuiGrid>
    </MuiGrid>
  );
};

export default TeamForm;
