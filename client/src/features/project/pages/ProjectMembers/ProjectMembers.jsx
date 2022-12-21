import { useOutletContext } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";

import TabPanel from "../../../../common/tabs/TabPanel";
import MemberList from "../../components/containers/MemberList";

import InviteButton from "../../components/buttons/AddMemberButton";

const ProjectMembers = () => {
  const [selectedTab] = useOutletContext();

  return (
    <TabPanel index={2} selectedTab={selectedTab}>
      <MuiGrid container spacing={1}>
        <MuiGrid item xs={12}>
          <MuiGrid container spacing={2}>
            <MuiGrid item flexGrow={1}></MuiGrid>
            <MuiGrid item>
              <InviteButton />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid item xs={12}>
          <MemberList />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default ProjectMembers;
