import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import StyledTab from "../../components/styled-tab/styled-tab.component";
import StyledTabs from "../../components/styled-tabs/styled-tabs.component";
import StyledAppBar from "../../components/styled-appbar/styled-appbar.component";

const Issues = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { board } = params;

  // state
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
      <StyledAppBar button={{ to: "/issue/create", p: "Create issue" }}>
        Issues
      </StyledAppBar>
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
