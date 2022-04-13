import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Box, Grid, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import AppBarContainer from "../../components/appbar-container/appbar-container.component";
import TabPanel from "../../components/tabpanel/tabpanel.component";

const Detailed = () => {
  return "Detailed view for issues";
};

const Kanban = () => {
  return "Kanban view for issues";
};

const Issues = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBarContainer>Issues</AppBarContainer>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Detailed" />
            <Tab label="Board" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Detailed />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Kanban />
        </TabPanel>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Grid container spacing={2}>
          <Grid item></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Issues;
