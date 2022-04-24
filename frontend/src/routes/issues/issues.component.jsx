import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import AppBarContainer from "../../components/appbar/appbar.component";
import TabPanel from "../../components/tabpanel/tabpanel.component";

const Detailed = () => {
  return (
    <Fragment>
      <span>TODO: Detailed view for issues</span>
      <span>TODO: Detailed view for issues</span>
      <span>TODO: Detailed view for issues</span>
      <span>TODO: Detailed view for issues</span>
      <span>TODO: Detailed view for issues</span>
      <span>TODO: Detailed view for issues</span>
    </Fragment>
  );
};

const IssueBoard = () => {
  return (
    <Fragment>
      <span>TODO: Need to create a kanban board view for issues</span>
      <span>TODO: Need to create a kanban board view for issues</span>
      <span>TODO: Need to create a kanban board view for issues</span>
      <span>TODO: Need to create a kanban board view for issues</span>
      <span>TODO: Need to create a kanban board view for issues</span>
      <span>TODO: Need to create a kanban board view for issues</span>
    </Fragment>
  );
};

const Issues = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  /*
    selectedTab can only have 0 or 1 value
    When the user go to /issues/board preselect board 1
  */
  const [selectedTab, setSelectedTab] = useState(id === "board" ? 1 : 0);
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
      <AppBarContainer>Issues</AppBarContainer>
      <Box>
        <Box position="static" sx={{ borderBottom: "3px solid #f4f4f4" }}>
          <Tabs value={selectedTab} onChange={handleChange}>
            <Tab label="Detailed" />
            <Tab label="Board" />
          </Tabs>
        </Box>
        <TabPanel selectedTab={selectedTab} index={0}>
          <Detailed />
        </TabPanel>
        <TabPanel selectedTab={selectedTab} index={1}>
          <IssueBoard />
        </TabPanel>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Grid container spacing={2}>
          <Grid item></Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Issues;
