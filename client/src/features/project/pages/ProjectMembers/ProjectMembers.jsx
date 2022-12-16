import { useOutletContext } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import TabPanel from "../../../../common/tabs/TabPanel";
import MemberList from "../../components/containers/MemberList";

import InviteButton from "../../components/buttons/AddMemberButton";

const ProjectMembers = () => {
  const [selectedTab] = useOutletContext();

  return (
    <TabPanel index={2} selectedTab={selectedTab}>
      <MuiGrid container>
        <MuiGrid item xs={12}>
          <MuiGrid container spacing={2}>
            <MuiGrid item flexGrow={1}>
              <Typography variant="body2">
                Project Members have varying levels of access to projects based
                on their Roles, which are set when adding new members and can be
                edited any time.
              </Typography>
            </MuiGrid>
            <MuiGrid item>
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
