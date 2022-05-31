import { Fragment, useState } from "react";
import { useNavigate, useParams, Link, Outlet } from "react-router-dom";

import { Box, Tab, Tabs } from "@mui/material";
import AppBarContainer from "../../components/appbar/appbar.component";
import TabPanel from "../../components/tabpanel/tabpanel.component";
import IssueDetailed from "../../components/issue-detailed/issue-detailed.component";

const Issues = (props) => {
  const navigate = useNavigate();
  const { board } = useParams();
  const [selectedTab, setSelectedTab] = useState(board ? 1 : 0);

  const handleChange = (event, newValue) => {
    const mapIndexToTab = {
      0: "/issues",
      1: "/issues/board",
    };
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <Fragment>
      <AppBarContainer element={<Link to="/issues/create">Create</Link>}>
        Issues
      </AppBarContainer>
      <Box>
        <Box position="static" sx={{ borderBottom: "3px solid #f4f4f4" }}>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Detailed" />
            <Tab label="Board" />
          </Tabs>
        </Box>
        <Box>
          <TabPanel selectedTab={selectedTab} index={0}>
            <IssueDetailed />
          </TabPanel>
          <TabPanel selectedTab={selectedTab} index={1}>
            <Outlet />
          </TabPanel>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Issues;
