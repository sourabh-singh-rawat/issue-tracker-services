import { useOutletContext, useParams } from "react-router-dom";

import MuiGrid from "@mui/material/Grid";
import IssueList from "../../../issue-list/components/containers/IssueList";
import AddIssueButton from "../../../issue/components/buttons/AddIssueButton/AddIssueButton";
import TabPanel from "../../../../common/tabs/TabPanel";

const ProjectIssues = () => {
  const [selectedTab] = useOutletContext();
  const { id } = useParams();

  return (
    <TabPanel index={1} selectedTab={selectedTab}>
      <MuiGrid container spacing={1}>
        <MuiGrid item xs={12} sx={{ display: "flex" }}>
          <MuiGrid container sx={{ flexGrow: 1 }}>
            <MuiGrid item>{/* TODO: SortSelector */}</MuiGrid>
            <MuiGrid item>{/* TODO: FilterSector */}</MuiGrid>
            <MuiGrid item sx={{ flexGrow: 1 }}></MuiGrid>
            <MuiGrid item>
              <AddIssueButton />
            </MuiGrid>
          </MuiGrid>
        </MuiGrid>
        <MuiGrid item xs={12}>
          <IssueList projectId={id} />
        </MuiGrid>
      </MuiGrid>
    </TabPanel>
  );
};

export default ProjectIssues;
