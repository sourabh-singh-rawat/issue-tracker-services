import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, Link, Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import AppBarContainer from "../../components/appbar/appbar.component";
import StyledTab from "../../components/styled-tab/styled-tab.component";
import StyledTabs from "../../components/styled-tabs/styled-tabs.component";

const Issues = (props) => {
  const navigate = useNavigate();
  const { board } = useParams();
  const [selectedTab, setSelectedTab] = useState(board ? 2 : 1);

  const handleChange = (e, newValue) => {
    const mapIndexToTab = {
      1: "/issues",
      2: "/issues/board",
    };
    navigate(`${mapIndexToTab[newValue]}`);
    setSelectedTab(newValue);
  };

  useEffect(() => {
    setSelectedTab(board ? 2 : 1);
  }, [board]);
  return (
    <Fragment>
      <AppBarContainer element={<Link to="/issue/create">Create issue</Link>}>
        Issues
      </AppBarContainer>
      <Box sx={{ margin: 3, marginTop: 0 }}>
        <Box position="static">
          <StyledTabs value={selectedTab} onChange={handleChange}>
            <StyledTab label="Detailed" value={1} />
            <StyledTab label="Board" value={2} />
          </StyledTabs>
          {/* styled tab panels */}
          <Outlet context={[selectedTab]} />
        </Box>
      </Box>
    </Fragment>
  );
};

export default Issues;
