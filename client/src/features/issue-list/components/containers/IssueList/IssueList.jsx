import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import { enIN, hi } from "date-fns/locale";
import { theme } from "../../../../../config/mui.config";

import MuiAvatar from "@mui/material/Avatar";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiTypography from "@mui/material/Typography";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";

import List from "../../../../../common/lists/List";
import SelectAssigneeEditCell from "../SelectAssigneeEditCell";
import StatusAndPrioritySelectorEditCell from "../StatusAndPrioritySelectorEditCell";

import {
  resetIssueList,
  setIssueList,
  updateIssueList,
} from "../../../slice/issue-list.slice";
import { useGetIssuesQuery } from "../../../api/issue-list.api";
import {
  setIssuePriority,
  setIssueStatus,
} from "../../../../issue/slice/issue.slice";
import {
  useGetIssuesPriorityQuery,
  useGetIssuesStatusQuery,
} from "../../../../issue/api/issue.api";

const IssueList = ({ projectId }) => {
  const dispatch = useDispatch();
  const reporterId = useSelector((store) => {
    return store.auth.user.uid;
  });
  const { rows, rowCount, page, pageSize } = useSelector(
    (store) => store.issueList
  );

  const getIssuesQuery = useGetIssuesQuery({
    projectId,
    page,
    pageSize,
    sortBy: "issues.created_at:desc",
    reporterId,
  });
  const issueStatus = useGetIssuesStatusQuery();
  const issuePriority = useGetIssuesPriorityQuery();

  useEffect(() => {
    if (getIssuesQuery.data) dispatch(setIssueList(getIssuesQuery.data));
  }, [pageSize, page, getIssuesQuery.data]);

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

  // on component unmount reset the issue list slice
  useEffect(() => {
    return () => {
      dispatch(resetIssueList());
    };
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
      minWidth: 450,
      renderCell: (params) => (
        <Link
          to={`/issues/${params.row.id}/overview`}
          style={{
            overflow: "hidden",
            textDecoration: "none",
          }}
        >
          <MuiTypography
            variant="body2"
            sx={{
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: theme.palette.text.primary,
              "&:hover": {
                color: theme.palette.primary.main,
                textDecoration: "none!important",
              },
            }}
          >
            {params.row.name}
          </MuiTypography>
        </Link>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      renderCell: (params) => <StatusAndPrioritySelectorEditCell {...params} />,
      renderEditCell: (params) => (
        <StatusAndPrioritySelectorEditCell {...params} />
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      editable: true,
      renderCell: (params) => <StatusAndPrioritySelectorEditCell {...params} />,
      renderEditCell: (params) => (
        <StatusAndPrioritySelectorEditCell {...params} />
      ),
    },
    {
      field: "assignee_id",
      headerName: "Assignee",
      width: 250,
      editable: true,
      renderCell: (params) => <SelectAssigneeEditCell {...params} />,
      renderEditCell: (params) => <SelectAssigneeEditCell {...params} />,
    },
    {
      field: "reporter_id",
      headerName: "Reporter",
      width: 200,
      renderCell: (params) => {
        return (
          <MuiMenuItem
            sx={{
              color: theme.palette.secondary.main,
              ":hover": {
                backgroundColor: "transparent",
                color: theme.palette.primary.main,
              },
            }}
            disableRipple
            disableGutters
          >
            <MuiListItemIcon>
              <MuiAvatar
                sx={{ width: "20px", height: "20px" }}
                src={params.row.reporter_photo_url}
              ></MuiAvatar>
            </MuiListItemIcon>
            <MuiListItemText>
              <MuiTypography variant="body2" sx={{ fontWeight: 500 }}>
                {params.row.reporter_name}
              </MuiTypography>
            </MuiListItemText>
          </MuiMenuItem>
        );
      },
    },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 150,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "eee, PP") : "-",
    },
    {
      field: "project_id",
      headerName: "Project Id",
      width: 125,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 125,
      renderCell: ({ value }) =>
        value ? format(parseISO(value), "PP", { locale: enIN }) : "-",
    },
    {
      flex: 0.14,
      field: "id",
      headerName: "Issue Id",
      minWidth: 100,
    },
  ];

  return (
    <List
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      isLoading={getIssuesQuery.isLoading}
      page={page}
      pageSize={pageSize}
      onPageChange={(newPage) => dispatch(updateIssueList({ page: newPage }))}
      onPageSizeChange={(pageSize) => dispatch(updateIssueList({ pageSize }))}
      getRowId={(row) => row.id}
      initialState={{
        sorting: { sortModel: [{ field: "status", sort: "desc" }] },
      }}
      autoHeight
    />
  );
};

export default IssueList;
