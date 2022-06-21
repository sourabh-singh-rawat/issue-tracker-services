import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";

const IssueTasks = () => {
  const [selectedTab, issue] = useOutletContext();
  return (
    <StyledTabPanel selectedTab={selectedTab} index={1}>
      Tasks
    </StyledTabPanel>
  );
};

export default IssueTasks;
