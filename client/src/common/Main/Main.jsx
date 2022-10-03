import { useEffect, Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import MuiBox from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";

import Toolbar from "@mui/material/Toolbar";

import Sidebar from "../../features/sidebar/components/Sidebar";
import Navbar from "../Navbar/Navbar";
import SnackBar from "../SnackBar/SnackBar";
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
    if (issueStatus.data) dispatch(setIssueStatus(issueStatus.data));
  }, [issueStatus.isSuccess]);

  useEffect(() => {
    if (issuePriority.data) dispatch(setIssuePriority(issuePriority.data));
  }, [issuePriority.isSuccess]);

  return (
    <Fragment>
      <Sidebar />
      <Navbar />
      <MuiBox sx={{ flexGrow: 1 }}>
        <Toolbar variant="dense" />
        <MuiContainer sx={{ paddingTop: "20px" }}>
          <Outlet />
        </MuiContainer>
        <SnackBar />
      </MuiBox>
    </Fragment>
  );
}
