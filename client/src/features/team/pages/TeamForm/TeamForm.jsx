import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";

import TextField from "../../../../common/TextField";
import SectionHeader from "../../../../common/SectionHeader/SectionHeader";

import { setSnackbarOpen } from "../../../snackbar.reducer";

const TeamForm = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ name: "", description: "" });

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormFields({ ...formFields, [fieldName]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formFields),
    });

    const { id } = await response.json();

    if (response.status === 200) setSnackbarOpen(true);
    navigate(`/teams/${id}/overview`);
  };

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
