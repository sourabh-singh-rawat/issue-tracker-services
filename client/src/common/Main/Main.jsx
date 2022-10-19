import { useEffect, Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import MuiToolbar from "@mui/material/Toolbar";

import Navbar from "../../features/navigation/components/Navbar";
import Sidebar from "../../features/navigation/components/Sidebar";
import SnackBar from "../SnackBar";

import {
  useGetIssuesStatusQuery,
  useGetIssuesPriorityQuery,
} from "../../features/issue/issue.api";
import {
  setIssueStatus,
  setIssuePriority,
} from "../../features/issue/issue.slice";

const Main = () => {
  const dispatch = useDispatch();
  const issueStatus = useGetIssuesStatusQuery();
  const issuePriority = useGetIssuesPriorityQuery();

  useEffect(() => {
    if (issueStatus.isSuccess) {
      dispatch(setIssueStatus(issueStatus.data));
    }
  }, [issueStatus]);

  useEffect(() => {
    if (issuePriority.isSuccess) {
      dispatch(setIssuePriority(issuePriority.data));
    }
  }, [issuePriority]);

  return (
    <Fragment>
      <Navbar />
      <Sidebar />
      <MuiBox sx={{ flexGrow: 1 }}>
        <MuiToolbar variant="dense" />
        <MuiContainer sx={{ paddingTop: "20px" }}>
          <Outlet />
        </MuiContainer>
        <SnackBar />
      </MuiBox>
    </Fragment>
  );
};

export default Main;
