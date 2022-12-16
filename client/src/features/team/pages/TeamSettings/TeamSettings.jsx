import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";
import MuiButton from "@mui/material/Button";
import MuiTypography from "@mui/material/Typography";

import TabPanel from "../../../../common/tabs/TabPanel";
import TextField from "../../../../common/textfields/TextField";

import { updateList } from "../../slice/team.slice";
import { setMessageBarOpen } from "../../../message-bar/slice/message-bar.slice";

const TeamSettings = () => {
  const [selectedTab] = useOutletContext();
  const team = useSelector((store) => store.team);
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateList({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = team;

    const response = await fetch(`http://localhost:4000/api/teams/${team.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });

    if (response.status === 200) dispatch(setMessageBarOpen(true));
  };

  return (
    <TabPanel selectedTab={selectedTab} index={4}>
      <MuiBox component="form" onSubmit={handleSubmit}>
        <MuiGrid container sx={{ marginTop: 3 }}>
          <MuiGrid item xs={12} md={4}>
            <MuiTypography variant="body2" sx={{ fontWeight: 600 }}>
              basic Information
            </MuiTypography>
          </MuiGrid>
          <MuiGrid item xs={12} md={8}>
            <MuiGrid container>
              <MuiGrid item xs={12}>
                <TextField
                  name="name"
                  title="Name"
                  value={team.name}
                  onChange={handleChange}
                  helperText="A name for your team"
                />
              </MuiGrid>
              <MuiGrid item xs={12}>
                <TextField
                  name="id"
                  title="team ID"
                  value={team.id}
                  helperText="This is the UID of the team owner"
                  disabled
                />
              </MuiGrid>
              <MuiGrid item xs={12}>
                <TextField
                  name="description"
                  title="Description"
                  value={team.description}
                  onChange={handleChange}
                  helperText="A text description of the project. Max character count is 150"
                  rows={4}
                  multiline
                />
              </MuiGrid>
            </MuiGrid>
          </MuiGrid>
          <MuiGrid container sx={{ marginTop: 3, marginBottom: 8 }}>
            <MuiGrid item md={4} />
            <MuiGrid item md={8}>
              <MuiButton
                variant="contained"
                type="submit"
                sx={{ textTransform: "none", fontWeight: 600 }}
              >
                Save Changes
              </MuiButton>
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
      </MuiBox>
    </TabPanel>
  );
};

export default TeamSettings;
