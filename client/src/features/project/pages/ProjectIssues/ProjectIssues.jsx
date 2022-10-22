import { useParams } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import MuiGrid from "@mui/material/Grid";

import IssueList from "../../../issueList/components/containers/IssueList";
import AddIssueButton from "../../../issue/components/buttons/AddIssueButton";

const ProjectIssues = () => {
  const { id } = useParams();

  return (
    <MuiGrid container spacing={1}>
      <MuiGrid item xs={12} sx={{ display: "flex" }}>
        <MuiBox sx={{ flexGrow: 1 }} />
        <AddIssueButton />
      </MuiGrid>
      <MuiGrid item xs={12}>
        <IssueList projectId={id} />
      </MuiGrid>
    </MuiGrid>
  );
};

export default ProjectIssues;
