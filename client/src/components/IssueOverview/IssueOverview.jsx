import { useOutletContext } from "react-router-dom";
import PageDescription from "../PageDescription/PageDescription";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";

const IssueOverview = () => {
  const [selectedTab, issue] = useOutletContext();

  return (
    <StyledTabPanel selectedTab={selectedTab} index={0}>
      <PageDescription page={issue} type="issue" />
    </StyledTabPanel>
  );
};

export default IssueOverview;
