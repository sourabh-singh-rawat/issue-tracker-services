import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import StyledTabPanel from "../StyledTabPanel/StyledTabPanel";

const TeamOverview = () => {
  const [selectedTab] = useOutletContext();
  const { description } = useSelector((store) => store.team);

  return (
    <StyledTabPanel selectedTab={selectedTab} index={0}>
      {description}
    </StyledTabPanel>
  );
};

export default TeamOverview;
