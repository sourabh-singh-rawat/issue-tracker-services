import { useOutletContext } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import TabPanel from "../../../../common/TabPanel";
import MemberList from "../../../../common/MemberList";

import InviteButton from "../../components/buttons/InviteButton";

const ProjectMembers = () => {
  const [selectedTab] = useOutletContext();

  return (
    <TabPanel index={2} selectedTab={selectedTab}>
      <MuiGrid container>
        <MuiGrid item>
          <MuiGrid container spacing={2}>
            <MuiGrid item xs={8} md={10} display="flex">
              <Typography variant="body2">
                Project Members have varying levels of access to projects based
                on their Roles, which are set when adding new members and can be
                edited any time.
              </Typography>
            </MuiGrid>
            <MuiGrid item xs={4} md={2}>
              <InviteButton />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid container>
          <MuiGrid item xs={12}>
            <MemberList />
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default ProjectMembers;
