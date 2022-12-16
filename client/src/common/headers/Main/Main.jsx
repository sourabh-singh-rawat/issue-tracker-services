import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import MuiToolbar from "@mui/material/Toolbar";

import MessageBar from "../../../common/notifications/MessageBar";
import MenuSidebar from "../../../common/navigations/MenuSidebar";

const Main = () => {
  return (
    <Fragment>
      <MenuSidebar />
      <MuiBox
        sx={{
          flexGrow: 1,
          paddingTop: "20px",
          paddingLeft: "30px",
          paddingRight: "30px",
          height: "100%",
        }}
      >
        <MuiToolbar variant="dense" />
        <Outlet />
        <MessageBar />
      </MuiBox>
    </Fragment>
  );
};

export default Main;
