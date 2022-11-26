import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import MuiBox from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import MuiToolbar from "@mui/material/Toolbar";

import Navbar from "../../features/navigation/components/containers/Navbar";
import Sidebar from "../../features/navigation/components/containers/Sidebar";
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
      <Sidebar />
      <MuiBox sx={{ flexGrow: 1, padding: "30px", height: "100%" }}>
        <MuiToolbar variant="dense" />
        <Outlet />
        <SnackBar />
      </MuiBox>
    </Fragment>
  );
};

export default Main;
