import { useOutletContext } from "react-router-dom";
import TabPanel from "../../../../common/TabPanel";

const ProjectAttatchment = () => {
  const [selectedTab] = useOutletContext();

  return <TabPanel selectedTab={selectedTab} index={4}></TabPanel>;
};

export default ProjectAttatchment;
