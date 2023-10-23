import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import daysjs from "dayjs";

import MuiTypography from "@mui/material/Typography";

import StatusAndPrioritySelectorEditCell from "../StatusAndPrioritySelectorEditCell";

import { resetIssueList, updateIssueList } from "../../issue-list.slice";

import { useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../common/hooks";
import List from "../../../../common/components/List";
import { useGetIssueListQuery } from "../../../../api/generated/issue.api";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import Avatar from "../../../../common/components/Avatar";
import AvatarGroup from "../../../../common/components/AvatarGroup";

function IssueList() {
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const reporterId = useAppSelector((s) => s.auth.currentUser?.userId);
  const { data: issueList } = useGetIssueListQuery({ projectId: id });
  const { rows, rowCount, page, pageSize } = useAppSelector((s) => s.issueList);

  // const getIssuesQuery = useGetIssuesQuery({
  //   projectId,
  //   page,
  //   pageSize,
  //   sortBy: "issues.createdAt:desc",
  //   reporterId,
  // });
  // const issueStatus = useGetIssuesStatusQuery();
  // const issuePriority = useGetIssuesPriorityQuery();

  // useEffect(() => {
  //   if (getIssuesQuery.data) dispatch(setIssueList(getIssuesQuery.data));
  // }, [pageSize, page, getIssuesQuery.data]);

  // useEffect(() => {
  //   if (issueStatus.isSuccess) {
  //     dispatch(setIssueStatus(issueStatus.data));
  //   }
  // }, [issueStatus]);

  // useEffect(() => {
  //   if (issuePriority.isSuccess) {
  //     dispatch(setIssuePriority(issuePriority.data));
  //   }
  // }, [issuePriority]);

  // on component unmount reset the issue list slice
  useEffect(
    () => () => {
      dispatch(resetIssueList());
    },
    [],
  );

  const columns: GridColDef<GridValidRowModel>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 0.3,
      minWidth: 350,
      renderCell: (params) => (
        <Link
          style={{
            overflow: "hidden",
            textDecoration: "none",
          }}
          to={`/issues/${params.row.id}/overview`}
        >
          <MuiTypography
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
            variant="body2"
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

      renderCell: (params) => <StatusAndPrioritySelectorEditCell {...params} />,
      renderEditCell: (params) => (
        <StatusAndPrioritySelectorEditCell {...params} />
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,

      renderCell: (params) => <StatusAndPrioritySelectorEditCell {...params} />,
      renderEditCell: (params) => (
        <StatusAndPrioritySelectorEditCell {...params} />
      ),
    },
    {
      field: "assignees",
      headerName: "Assignee",
      renderCell: ({ value }) => {
        return <AvatarGroup members={value} total={value.length} />;
      },
    },
    {
      field: "reporter",
      headerName: "Reporter",
      width: 200,
      renderCell: ({ value, row }) => (
        <Link
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
          to={`/profile/${value.userId}`}
        >
          <Avatar label={value.name} photoUrl={value.photoUrl} />
          <MuiTypography
            sx={{
              pl: theme.spacing(1),
              color: theme.palette.text.primary,
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
            variant="body2"
          >
            {value.name}
          </MuiTypography>
        </Link>
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 125,
      renderCell: ({ value }) =>
        value ? (
          <MuiTypography variant="body2" noWrap>
            {daysjs(daysjs(value)).fromNow()}
          </MuiTypography>
        ) : (
          "-"
        ),
    },
    {
      field: "projectId",
      headerName: "Project Id",
      width: 125,
      renderCell: ({ value }) => (
        <MuiTypography variant="body2" noWrap>
          {value}
        </MuiTypography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 125,
      renderCell: ({ value }) =>
        value ? (
          <MuiTypography variant="body2" noWrap>
            {daysjs().to(daysjs(value))}
          </MuiTypography>
        ) : (
          "-"
        ),
    },
    {
      field: "id",
      headerName: "Issue Id",
      minWidth: 125,
      renderCell: ({ value }) => (
        <MuiTypography variant="body2" noWrap>
          {value}
        </MuiTypography>
      ),
    },
  ];

  return (
    <List
      columns={columns}
      getRowId={(row) => row.id}
      initialState={{
        sorting: { sortModel: [{ field: "status", sort: "desc" }] },
      }}
      // isLoading={getIssuesQuery.isLoading}
      page={page}
      pageSize={pageSize}
      rowCount={rowCount}
      rows={issueList?.rows}
      autoHeight
      onPageChange={(newPage) => dispatch(updateIssueList({ page: newPage }))}
      onPageSizeChange={(newSize) =>
        dispatch(updateIssueList({ pageSize: newSize }))
      }
    />
  );
}

export default IssueList;
