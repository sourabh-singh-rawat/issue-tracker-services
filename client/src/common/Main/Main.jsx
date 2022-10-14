import { useEffect, Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";

import MuiToolbar from "@mui/material/Toolbar";

import SnackBar from "../SnackBar";
import Sidebar from "../../features/navigation/components/Sidebar";
import Navbar from "../../features/navigation/components/Navbar";

import {
  useGetIssuesPriorityQuery,
  useGetIssuesStatusQuery,
} from "../../features/issue/issue.api";
import {
  setIssuePriority,
  setIssueStatus,
} from "../../features/issue/issue.slice";

export default function Main() {
  const dispatch = useDispatch();
  const issueStatus = useGetIssuesStatusQuery();
  const issuePriority = useGetIssuesPriorityQuery();

  useEffect(() => {
    if (issueStatus.isSuccess) dispatch(setIssueStatus(issueStatus.data));
  }, [issueStatus.data]);

  useEffect(() => {
    if (issuePriority.isSuccess) dispatch(setIssuePriority(issuePriority.data));
  }, [issuePriority.data]);

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
}
